// @flow

import React from 'react';
import './loginform.css';

type Props = {
    onSubmit: Function
};

export default class LoginForm extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        console.log(value);
    }

    render() {
        return (
            <div className="login-form text-center">
                <form className="form-signin" onSubmit={this.props.onSubmit}>
                    <h1>Please sign in</h1>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        name="email"
                        required
                        autoFocus
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We&apos;ll never share your email with anyone else.
                    </small>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />

                    <div className="checkbox mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            name="rememberMe"
                            checked={this.state.rememberMe}
                            onChange={this.handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Check me out
                        </label>
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary btn-block">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
