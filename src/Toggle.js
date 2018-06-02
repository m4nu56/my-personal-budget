import React from 'react';
import ReactDOM from 'react-dom';

class Toggle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            id: 8
        };

        // This binding is necessary to make `this` work in the callback
        //this.handleClick = this.handleClick.bind(this);
    }

    handleClick(id) {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn,
            id: id
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick.bind(this, 12)}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
                -
                <span>{this.state.id}</span>
            </button>
        )
    }

}

ReactDOM.render(
    <Toggle/>,
    document.getElementById('root')
);