// @flow

import * as React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {CATEGORIES} from '../CATEGORIES';

type PropsBudgetList = {
    lstMouvement: PropTypes.array,
    onDelete: PropTypes.func
};

export default class BudgetList extends React.Component<PropsBudgetList> {
    constructor(props) {
        super(props);
    }

    render() {
        const {lstMouvement} = this.props;
        const mouvementRows = lstMouvement.map((mouvement, index) => {
            let find = CATEGORIES.find(c => c.name === mouvement.category);
            let libelle = find ? find.libelle : mouvement.category;
            return (
                <tr key={index}>
                    <td>{mouvement.id}</td>
                    <td>{mouvement.year}</td>
                    <td>{mouvement.month}</td>
                    <td>{moment(mouvement.date).format('DD/MM/YYYY')}</td>
                    <td>{mouvement.amount}</td>
                    <td>{libelle}</td>
                    <td>{mouvement.label}</td>
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
                        <th scope="col">Année</th>
                        <th scope="col">Mois</th>
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
