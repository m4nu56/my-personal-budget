// @flow

import * as React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

type PropsBudgetList = {
    lstMouvement: Array,
    onDelete: Function
};

export default class BudgetList extends React.Component<PropsBudgetList> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const lstMouvement = this.props.lstMouvement;
        const mouvementRows = lstMouvement.map((mouvement, index) => {
            return (
                <tr key={index}>
                    <td>{mouvement.id}</td>
                    <td>{moment(mouvement.date, 'X').format('DD/MM/YYYY')}</td>
                    <td>{mouvement.montant}</td>
                    <td>{mouvement.categorie}</td>
                    <td>{mouvement.libelle}</td>
                    <td>
                        <Link to={`/mouvement/${mouvement.id}`}>
                            <button className="btn btn-small">
                                <i className="glyphicon glyphicon-edit" />
                            </button>
                        </Link>
                        <button className="btn btn-small" onClick={() => this.props.onDelete(mouvement)}>
                            <i className="glyphicon glyphicon-minus" />
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <table className="table table-sm table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Montant</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Libelle</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>{mouvementRows}</tbody>
            </table>
        );
    }
}
