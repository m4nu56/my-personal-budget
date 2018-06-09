import BudgetList from './BudgetList';
import React from 'react';
import BudgetForm from './BudgetForm';

export default class Budget extends React.Component {
    constructor(props) {
        super(props);

        const lstMouvement = [
            { id: 1, date: new Date(), montant: 123.22, libelle: 'achat bidule' },
            { id: 2, date: new Date(), montant: 123.22, libelle: 'achat bidule' },
            { id: 3, date: new Date(), montant: 123.22, libelle: 'achat bidule' },
            { id: 4, date: new Date(), montant: 123.22, libelle: 'achat bidule' }
        ];

        this.state = {
            lstMouvement: lstMouvement
        };
    }

    render() {
        return (
            <div className="text-center">
                <button className="btn btn-sm btn-primary m-2" data-toggle="modal" data-target="#exampleModal">
                    Ajouter un mouvement
                </button>
                <BudgetForm />
                <BudgetList lstMouvement={this.state.lstMouvement} />
            </div>
        );
    }
}
