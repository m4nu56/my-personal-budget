import BudgetList from './list/BudgetList';
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import BudgetForm from './form/BudgetForm';
import {CATEGORIES} from './CATEGORIES';
import * as Utils from '../Utils';
import {makeFetch} from '../api';

export default class Budget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouvementEdited: null
        };
    }

    handleSubmit = mouvement => {
        this.setState({
            mouvementEdited: null
        });
        this.props.onSaveMouvement(mouvement);
    };

    render() {
        if (this.state.mouvementEdited) {
            return (
                <BudgetForm
                    {...this.props}
                    onSubmit={() => this.handleSubmit}
                    onHide={() => this.setState({mouvementEdited: null})}
                    onSaveMouvement={this.props.onSaveMouvement}
                />
            );
        }

        let dateRandom = moment(Math.floor(Math.random() * 30) + 1 + '/' + (Math.floor(Math.random() * 11) + 1) + '/2019', 'DD/MM/YYYY');
        let category = CATEGORIES[Utils.getRandomInt(0, CATEGORIES.length)];
        return (
            <div className="text-center">
                <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() =>
                        this.handleSubmit({
                            year: Number(dateRandom.format('YYYY')),
                            month: Number(dateRandom.format('M')),
                            date: dateRandom.format(),
                            label: Math.random()
                                .toString(36)
                                .substring(25),
                            category: category ? category.name : '',
                            amount: Math.floor((Math.random() * 450 + 55) * 100) / 100
                        })
                    }
                >
                    <i className="glyphicon glyphicon-plus" /> Ajouter un mouvement random
                </button>

                <button className="btn btn-sm btn-primary m-2" onClick={() => this.setState({mouvementEdited: {date: '01/01/2019'}})}>
                    <i className="glyphicon glyphicon-plus" /> Form Ajouter un mouvement
                </button>

                <button className="btn btn-sm btn-primary m-2" onClick={() => this.props.lstMouvement.forEach(m => this.props.handleDelete(m))}>
                    <i className="glyphicon glyphicon-minus" /> Supprimer tous
                </button>

                <Link to="/mouvement/import" className="navbar-brand">
                    <button className="btn btn-sm btn-primary m-2">
                        <i className="glyphicon glyphicon-plus" /> Import
                    </button>
                </Link>

                <BudgetList lstMouvement={this.props.lstMouvement} onDelete={this.props.handleDelete} />
            </div>
        );
    }
}

Budget.propTypes = {
    lstMouvement: PropTypes.array,
    handleDelete: PropTypes.func,
    onSaveMouvement: PropTypes.func
};
