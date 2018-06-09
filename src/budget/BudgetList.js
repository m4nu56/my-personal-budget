// @flow

import * as React from 'react';

type Props = {
    lstMouvement2: Array
};


export default class BudgetList extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const lstMouvement = this.props.lstMouvement;
        const mouvementRows = lstMouvement.map((mouvement) => {
            return (
                <tr key={mouvement.id}>
                    <td>{mouvement.id}</td>
                    <td>{mouvement.date.toDateString()}</td>
                    <td>{mouvement.montant}</td>
                    <td>{mouvement.libelle}</td>
                </tr>
            );
        });

        return (
            <table className="table table-sm table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Libelle</th>
                </tr>
                </thead>
                <tbody>
                {mouvementRows}
                </tbody>
            </table>
        );
    }
}
