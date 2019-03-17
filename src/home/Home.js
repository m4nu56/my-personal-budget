import React from 'react';
import LoginForm from './../login/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './../About';
import './home.css';
import Header from '../header/Header';
import BudgetImport from '../budget/import/BudgetImport';
import Budget from '../budget/Budget';
import fire from '../fire';
import BudgetForm from '../budget/form/BudgetForm';
import Dexie from 'dexie';
import moment from 'moment';
import NotificationSystem from 'react-notification-system';
import BudgetAnalyze from '../budget/analyze/BudgetAnalyze';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        const db = new Dexie('Budget');
        db.version(1).stores({
            mouvement: 'id, date, libelle, categorie, montant'
        });
        this.state = {
            isLogged: true,
            lstMouvement: [],
            db: db
        };

        this.notificationSystem = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleSaveMouvement = this.handleSaveMouvement.bind(this);
    }

    addNotification = (message, level) => {
        const notification = this.notificationSystem.current;
        notification.addNotification({
            message: message,
            level: level,
            autoDismiss: level === 'info' ? 1 : 5,
            position: 'tr'
        });
    };

    handleLogout() {
        this.setState({
            isLogged: false
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isLogged: true
        });
    }

    handleDelete = mouvement => {
        fire.database()
            .ref('mouvements/')
            .child(mouvement.id)
            .remove()
            .then(() => {
                console.log(`mouvement ${mouvement.id} deleted from firebase`);
                this.addNotification(`Mouvement ${mouvement.id} correctement supprimé en base.`, 'success');
                this.state.db.mouvement
                    .delete(mouvement.id)
                    .then(() => {
                        console.info(`mouvement ${mouvement.id} deleted from dexie`);
                        this.addNotification(`Mouvement ${mouvement.id} correctement supprimé de dexie.`, 'success');
                    })
                    .catch(error => {
                        console.error(`error deleting ${mouvement.id} from dexie`, error);
                        this.addNotification(`Erreur lors de la suppression du mouvement ${mouvement.id} de dexie.`, 'error');
                    });
            })
            .catch(error => {
                console.error(`error deleting mouvement from firebase ${mouvement.id}: ${error}`, error);
                this.addNotification(`Erreur lors de la suppression du mouvement ${mouvement.id} de la base.`, 'error');
            });
    };

    handleSaveMouvement(mouvement) {
        if (mouvement.id) {
            // update mouvement in db
            fire.database()
                .ref('mouvements/')
                .child(mouvement.id)
                .set(mouvement)
                .then(() => {
                    console.log(`mouvement ${mouvement} updated in db`);
                    this.addNotification(`Mouvement ${mouvement.id} mis à jour.`, 'success');
                })
                .catch(error => {
                    console.error(`error inserting ${mouvement} in db: (${error}`, error);
                    this.addNotification(`Erreur mis a jour du mouvement ${mouvement.id}: ${error}`, 'error');
                });
        } else {
            // create new mouvement in db
            fire.database()
                .ref('mouvements/')
                .push(mouvement)
                .then(response => {
                    console.log(`mouvement ${mouvement} added in db: ${response.key}`, response);
                    this.addNotification(`Mouvement ${response.key} correctement ajouté.`, 'success');
                })
                .catch(error => {
                    console.error(`error inserting ${mouvement} in db: ${error}`, error);
                    this.addNotification(`Erreur création du mouvement ${mouvement}: ${error}`, 'error');
                });
        }
    }

    handleImport(mouvementLst) {
        this.setState({
            lstMouvement: [...this.state.lstMouvement, ...mouvementLst]
        });
    }

    async initFire() {
        // look for the last mouvement in local db
        const lastMouvementInIndexedDb = await this.state.db.mouvement
            .orderBy('date')
            .reverse()
            .limit(1)
            .toArray();
        let startAt = moment('01/01/2019', 'DD/MM/YYYY').format('X');
        // if (lastMouvementInIndexedDb.length > 0) {
        //     console.log('lastMouvementInIndexedDb', moment(lastMouvementInIndexedDb[0].date).format());
        //     startAt = lastMouvementInIndexedDb[0].date + 1;
        // }

        let mouvementRef = fire
            .database()
            .ref('mouvements')
            .orderByChild('date')
            .startAt(startAt);

        mouvementRef.on('child_added', async snapshot => {
            this.addNotification(`child_added: ${snapshot.key}`, 'info');

            let mouvement = snapshot.val();
            mouvement.id = snapshot.key;

            let lstMouvement = this.state.lstMouvement;
            if (!lstMouvement.find(m => m.id === mouvement.id)) {
                lstMouvement.push(mouvement);
            }
            this.setState({
                lstMouvement: lstMouvement
            });
            const mvtDexie = await this.state.db.mouvement.get(mouvement.id);
            if (mvtDexie !== undefined && mvtDexie != null) {
                this.addNotification(`mouvement ${mouvement.id} already exists in dexie`, 'info');
            } else {
                this.state.db.mouvement
                    .add(mouvement)
                    .then(response => {
                        this.addNotification(`mouvement ${mouvement.id} added to dexie: ${response}`, 'success');
                    })
                    .catch(error => {
                        console.error(`error insertind ${mouvement.id} to dexie: ${error}`);
                        this.addNotification(`Erreur lors de l'insertion du mouvement ${mouvement.id} a dexie: ${error}`, 'error');
                    });
            }
        });
        mouvementRef.on('child_changed', snapshot => {
            this.addNotification(`child_changed: ${snapshot.key}`, 'info');
            let lstMouvement = this.state.lstMouvement;
            this.setState({
                lstMouvement: lstMouvement.map(m => (m.id === snapshot.key ? snapshot.val() : m))
            });
        });
        mouvementRef.on('child_removed', snapshot => {
            this.addNotification(`child_removed: ${snapshot.key}`, 'info');
            let lstMouvement = this.state.lstMouvement;
            this.setState({
                lstMouvement: lstMouvement.filter(m => m.id !== snapshot.key)
            });
        });
    }

    async componentWillMount() {
        // try reading data from the indexeddb local database
        try {
            const lst = await this.state.db.mouvement.toArray();
            this.setState(
                {
                    lstMouvement: lst
                },
                () => this.initFire()
            );
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const isLogged = this.state.isLogged;

        if (isLogged) {
            return (
                <Router>
                    <div>
                        <Header />

                        <div className="container" style={{marginTop: '30px'}}>
                            <div className="row align-items-center">
                                <div className="col">
                                    <Route path="/analyze" exact={true} render={props => <BudgetAnalyze {...props} lstMouvement={this.state.lstMouvement} />} />
                                    <Route
                                        path="/mouvement"
                                        exact={true}
                                        render={props => (
                                            <Budget
                                                {...props}
                                                lstMouvement={this.state.lstMouvement}
                                                handleSaveMouvement={this.handleSaveMouvement}
                                                handleDelete={this.handleDelete}
                                            />
                                        )}
                                    />
                                    <Switch>
                                        <Route
                                            path="/mouvement/import"
                                            exact={true}
                                            render={props => (
                                                <BudgetImport {...props} handleImport={() => this.handleImport} lstMouvement={this.state.lstMouvement} />
                                            )}
                                        />
                                        <Route
                                            path="/mouvement/:id"
                                            render={props => <BudgetForm {...props} handleSaveMouvement={this.handleSaveMouvement} />}
                                        />
                                    </Switch>
                                    <Route path="/about" component={About} />
                                </div>
                            </div>
                        </div>

                        {/* <Footer handleLogout={this.handleLogout} /> */}
                        <NotificationSystem ref={this.notificationSystem} />
                    </div>
                </Router>
            );
        } else {
            return <LoginForm onSubmit={this.handleSubmit} />;
        }
    }
}
