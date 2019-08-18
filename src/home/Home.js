import React from 'react';
import LoginForm from '../login/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from '../About';
import './home.css';
import Header from '../header/Header';
import BudgetImport from '../budget/import/BudgetImport';
import Budget from '../budget/Budget';
import BudgetForm from '../budget/form/BudgetForm';
import NotificationSystem from 'react-notification-system';
import BudgetAnalyze from '../budget/analyze/BudgetAnalyze';
import {makeFetch} from '../api';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: true,
            lstMouvement: [],
            lstCategories: []
        };

        this.notificationSystem = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    async componentWillMount() {
        // Chargement des mouvements
        this.fetchMovements();
        // Chargement des catégories
        this.fetchCategories();
    }

    fetchMovements = () => {
        makeFetch(`movements`)
            .then(response => {
                this.setState({
                    lstMouvement: response
                });
            })
            .catch(error => {
                this.addNotification(
                    `Erreur lors de la récupération des mouvements. ${error}`,
                    'error'
                );
            });
    };

    fetchCategories = () => {
        makeFetch(`categories`)
            .then(response => {
                this.setState({
                    lstCategories: response
                });
            })
            .catch(error => {
                this.addNotification(
                    `Erreur lors de la récupération des catégories. ${error}`,
                    'error'
                );
            });
    };

    addNotification = (message, level) => {
        const notification = this.notificationSystem.current;
        if (notification != null) {
            notification.addNotification({
                message: message,
                level: level,
                autoDismiss: level === 'info' ? 1 : 5,
                position: 'tr'
            });
        }
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
        makeFetch(`movements/${mouvement.id}`, 'DELETE')
            .then(result => {
                this.addNotification(
                    `Mouvement ${mouvement.id} supprimé.`,
                    'success'
                );

                let lstMouvement = this.state.lstMouvement.filter(
                    m => m.id !== mouvement.id
                );
                this.setState({
                    lstMouvement: lstMouvement
                });
            })
            .catch(error => {
                this.addNotification(
                    `Erreur suppression du mouvement ${mouvement.id}.`,
                    'error'
                );
            });
    };

    onSaveMouvement = mouvement => {
        if (mouvement.id) {
            makeFetch(`movements/${mouvement.id}`, 'PUT', mouvement)
                .then(result => {
                    console.log(`mouvement ${mouvement.id} updated in db`);
                    this.addNotification(
                        `Mouvement ${mouvement.id} mis à jour.`,
                        'success'
                    );
                })
                .catch(error => {
                    console.error(
                        `error inserting ${mouvement} in db: (${error}`,
                        error
                    );
                    this.addNotification(
                        `Erreur mis a jour du mouvement ${
                            mouvement.id
                        }: ${error}`,
                        'error'
                    );
                });
        } else {
            makeFetch(`movements`, 'POST', mouvement)
                .then(result => {
                    this.addNotification(
                        `Mouvement ${result.id} créé.`,
                        'success'
                    );
                    let lstMouvement = this.state.lstMouvement;
                    mouvement.id = result.id;
                    lstMouvement.push(mouvement);
                    this.setState({
                        lstMouvement: lstMouvement
                    });
                })
                .catch(error => {
                    this.addNotification(
                        `Erreur création du mouvement`,
                        'error'
                    );
                });
        }
    };

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
                                    <Route
                                        path="/analyze"
                                        exact={true}
                                        render={props => (
                                            <BudgetAnalyze
                                                {...props}
                                                lstMouvement={
                                                    this.state.lstMouvement
                                                }
                                                lstCategories={
                                                    this.state.lstCategories
                                                }
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/mouvement"
                                        exact={true}
                                        render={props => (
                                            <Budget
                                                {...props}
                                                lstMouvement={
                                                    this.state.lstMouvement
                                                }
                                                lstCategories={
                                                    this.state.lstCategories
                                                }
                                                onSaveMouvement={
                                                    this.onSaveMouvement
                                                }
                                                handleDelete={this.handleDelete}
                                            />
                                        )}
                                    />
                                    <Switch>
                                        <Route
                                            path="/mouvement/import"
                                            exact={true}
                                            render={props => (
                                                <BudgetImport
                                                    {...props}
                                                    lstMouvement={
                                                        this.state.lstMouvement
                                                    }
                                                    onSaveMouvement={
                                                        this.onSaveMouvement
                                                    }
                                                />
                                            )}
                                        />
                                        <Route
                                            path="/mouvement/:id"
                                            render={props => (
                                                <BudgetForm
                                                    {...props}
                                                    onSaveMouvement={
                                                        this.onSaveMouvement
                                                    }
                                                    lstCategories={
                                                        this.state.lstCategories
                                                    }
                                                />
                                            )}
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
