import BudgetList from './BudgetList';
import React from 'react';
import BudgetForm from './BudgetForm';

export default class Budget extends React.Component {
    constructor(props) {
        super(props);

        const lstMouvement = [
            { id: 1, date: '10/04/2018', montant: 123.22, libelle: 'achat bidule' },
            { id: 2, date: '11/05/2018', montant: 123.22, libelle: 'achat bidule' },
            { id: 3, date: '11/05/2018', montant: 123.22, libelle: 'achat bidule' },
            { id: 4, date: '11/05/2018', montant: 123.22, libelle: 'achat bidule' }
        ];

        this.state = {
            showModal: false,
            lstMouvement: lstMouvement
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    handleSubmit(mouvement) {
        console.log(mouvement);
        let newLstMouvement = this.state.lstMouvement.slice();
        newLstMouvement.push(mouvement);
        this.setState({
            showModal: false,
            lstMouvement: newLstMouvement
        });
    }

    handleHide() {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <div className="text-center">
                <button className="btn btn-sm btn-primary m-2" onClick={() => this.setState({ showModal: true })}>
                    Ajouter un mouvement
                </button>
                <BudgetForm onSubmit={this.handleSubmit} show={this.state.showModal} onHide={this.handleHide} />
                <BudgetList lstMouvement={this.state.lstMouvement} />
            </div>
        );
    }
}
