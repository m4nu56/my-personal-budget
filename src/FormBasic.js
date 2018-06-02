import React from 'react';
import './App.css';

class FormBasic extends React.Component {
    handleSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var partialState = {};
        partialState[name] = value;
        this.setState(partialState);
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            select: ''
        };
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="text" onChange={this.handleChange} value={this.state.text}/>
                </label>
                <input type="submit" value="Submit"/>

                <label>
                    Pick your favorite La Croix flavor:
                    <select value={this.state.select} name="select" onChange={this.handleChange}>
                        <option></option>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>

                <input type="file"/>

            </form>
        );
    }
}

export default FormBasic;