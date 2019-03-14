import BudgetList from './list/BudgetList';
import React from 'react';
import BudgetForm from './form/BudgetForm';
import fire from '../fire';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Budget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mouvementEdited: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        let val = moment('17/05/2019', 'DD/MM/YYYY', 'fr').format('X');
        console.log(val);
        console.log(moment(val, 'X').format('DD/MM/YYYY'));
    }

    handleSubmit = mouvement => {
        console.log(mouvement);
        if (mouvement.id) {
            fire.database()
                .ref('mouvements/')
                .child(mouvement.id)
                .set(mouvement);
        } else {
            fire.database()
                .ref('mouvements/')
                .push(mouvement);
        }
        this.setState({
            mouvementEdited: null
        });
    };
    handleDelete = mouvement => {
        fire.database()
            .ref('mouvements/')
            .child(mouvement.id)
            .remove();
    };

    handleHide() {
        this.setState({
            mouvementEdited: null
        });
    }

    handleEdit(mouvement) {
        this.setState({
            mouvementEdited: mouvement
        });
    }

    render() {
        let content = <BudgetList lstMouvement={this.props.lstMouvement} onEdit={this.handleEdit} onDelete={this.handleDelete} />;

        if (this.state.mouvementEdited != null) {
            content = <BudgetForm onSubmit={this.handleSubmit} onHide={this.handleHide} mouvement={this.state.mouvementEdited} />;
        }

        return (
            <div className="text-center">
                <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() =>
                        this.handleSubmit({
                            date: moment(Math.floor(Math.random() * 30) + 1 + '/' + (Math.floor(Math.random() * 11) + 1) + '/2019', 'DD/MM/YYYY').format('X'),
                            libelle: Math.random()
                                .toString(36)
                                .substring(25),
                            categorie: Math.random()
                                .toString(36)
                                .substring(7),
                            montant: Math.floor((Math.random() * 450 + 55) * 100) / 100
                        })
                    }
                >
                    <i className="glyphicon glyphicon-plus" /> Ajouter un mouvement 222
                </button>
                <button className="btn btn-sm btn-primary m-2" onClick={() => this.setState({mouvementEdited: {date: '01/01/2019'}})}>
                    <i className="glyphicon glyphicon-plus" /> Ajouter un mouvement
                </button>
                <button className="btn btn-sm btn-primary m-2" onClick={() => this.props.lstMouvement.forEach(m => this.handleDelete(m))}>
                    <i className="glyphicon glyphicon-minus" /> Supprimer tous
                </button>
                <Link to="/mouvement/import" className="navbar-brand">
                    <button className="btn btn-sm btn-primary m-2">
                        <i className="glyphicon glyphicon-plus" /> Import
                    </button>
                </Link>

                {content}
            </div>
        );
    }
}

Budget.propTypes = {
    lstMouvement: PropTypes.array
};
