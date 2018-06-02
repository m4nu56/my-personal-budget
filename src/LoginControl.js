import React from 'react';
import ReactDOM from 'react-dom';

class LoginControl extends React.Component {
    handleLoginClick = () => {
        this.setState({isLoggedIn: true});
    }
    handleLogoutClick = () => {
        this.setState({isLoggedIn: false});
    }

    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    render() {

        const isLoggedIn = this.state.isLoggedIn;

        const button = isLoggedIn ? (
            <LogoutButton onClick={this.handleLogoutClick}/>
        ) : (
            <LoginButton onClick={this.handleLoginClick}/>
        );


        return (
            <div>
                <Greeting isLoggedIn={this.state.isLoggedIn}/>
                {button}
            </div>
        )
    }

}

ReactDOM.render(
    <LoginControl/>,
    document.getElementById('root')
);


function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}


function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting/>;
    }
    return <GuestGreeting/>;
}
