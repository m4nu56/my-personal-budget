import React from "react";
import LoginForm from "./login/LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import BudgetList from "./BudgetList";
import Footer from "./Footer";
import Header from "./Header";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.setState({
            isLogged: false,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isLogged: true,
        });
    }

    render() {
        const isLogged = this.state.isLogged;

        if (isLogged) {
            return (
                <div>
                    <Header/>

                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col">
                                <BudgetList/>
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
            )
        } else {

            return (
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col">
                            <h1>Login</h1>
                            <LoginForm onSubmit={this.handleSubmit}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}