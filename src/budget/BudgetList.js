import React from "react";

export default class BudgetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const mouvementRows = this.props.lstMouvement.map((mouvement) => {
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