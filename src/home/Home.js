import React from 'react';
import LoginForm from './../login/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './../About';
import './home.css';
import Header from '../header/Header';
import BudgetImport from '../budget/BudgetImport';
import Budget from '../budget/Budget';
import fire from '../fire';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: true,
            lstMouvement: []
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

    componentWillMount() {
        let mouvementRef = fire
            .database()
            .ref('mouvements')
            .orderByChild('date');

        mouvementRef.on('child_added', snapshot => {
            let mouvement = snapshot.val();
            mouvement.id = snapshot.key;

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

    render() {
        const isLogged = this.state.isLogged;

        if (isLogged) {
            return (
                <Router>
                    <div>
                        <Header />

                        <div className="container" style={{ marginTop: '30px' }}>
                            <div className="row align-items-center">
                                <div className="col">
                                    <Route
                                        path="/mouvement"
                                        exact={true}
                                        render={props => <Budget {...props} lstMouvement={this.state.lstMouvement} />}
                                    />
                                    <Route
                                        path="/mouvement/import"
                                        render={props => (
                                            <BudgetImport
                                                {...props}
                                                handleImport={() => this.handleImport}
                                                lstMouvement={this.state.lstMouvement}
                                            />
                                        )}
                                    />
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
