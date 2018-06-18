import React from 'react';
import LoginForm from './../login/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './../footer/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './../About';
import './home.css';
import Header from '../header/Header';
import Budget from '../budget/Budget';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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
                                    <Route path="/mouvement" component={Budget} />
                                    <Route path="/about" component={About} />
                                </div>
                            </div>
                        </div>

                        <Footer handleLogout={this.handleLogout} />
                    </div>
                </Router>
            );
        } else {
            return <LoginForm onSubmit={this.handleSubmit} />;
        }
    }
}
