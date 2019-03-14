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
import DevExtremeTest from '../devextreme/DevExtremeTest';
import BudgetForm from '../budget/form/BudgetForm';
import Dexie from 'dexie';

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleImport = this.handleImport.bind(this);
    }

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

    handleImport(mouvementLst) {
        this.setState({
            lstMouvement: [...this.state.lstMouvement, ...mouvementLst]
        });
    }

    async initFire() {
        const lastMouvementInIndexedDb = await this.state.db.mouvement
            .orderBy('date')
            .reverse()
            .limit(1)
            .toArray();

        console.log(lastMouvementInIndexedDb[0]);

        let mouvementRef = fire
            .database()
            .ref('mouvements')
            .orderByChild('date')
            .startAt(lastMouvementInIndexedDb[0].date + 1);

        mouvementRef.on('child_added', async snapshot => {
            let mouvement = snapshot.val();
            mouvement.id = snapshot.key;
            try {
                await this.state.db.mouvement.add(mouvement);
            } catch (error) {
                console.log(error);
            }

            let lstMouvement = this.state.lstMouvement;
            lstMouvement.push(mouvement);
            this.setState({
                lstMouvement: lstMouvement
            });
        });
        mouvementRef.on('child_changed', snapshot => {
            let lstMouvement = this.state.lstMouvement;
            this.setState({
                lstMouvement: lstMouvement.map(m => (m.id === snapshot.key ? snapshot.val() : m))
            });
        });
        mouvementRef.on('child_removed', snapshot => {
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
                                    <Route path="/mouvement" exact={true} render={props => <Budget {...props} lstMouvement={this.state.lstMouvement} />} />
                                    <Switch>
                                        <Route
                                            path="/mouvement/import"
                                            exact={true}
                                            render={props => (
                                                <BudgetImport {...props} handleImport={() => this.handleImport} lstMouvement={this.state.lstMouvement} />
                                            )}
                                        />
                                        <Route path="/mouvement/:id" component={BudgetForm} />
                                    </Switch>
                                    <Route path="/devextreme" component={DevExtremeTest} />
                                    <Route path="/about" component={About} />
                                </div>
                            </div>
                        </div>

                        {/* <Footer handleLogout={this.handleLogout} /> */}
                    </div>
                </Router>
            );
        } else {
            return <LoginForm onSubmit={this.handleSubmit} />;
        }
    }
}
