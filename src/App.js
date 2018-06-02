import React from 'react';
import './App.css';

class App extends React.Component {

    render() {

        return (
            <div className="App">
                <ul>
                    {this.props.numbers.map(
                        (number) => <ListItems key={number} value={number * 4}/>
                    )}
                </ul>
            </div>
        );
    }

}

function ListItems(props) {
    return (
        <li>{props.value}</li>
    )
}

export default App;
