// @flow

import React from 'react';
import {Button} from 'react-bootstrap';
import InputCategorie from './InputCategorie';
import moment from 'moment';
import CONSTANTS from '../../Constants';
import {makeFetch} from '../../api';

type PropsBudgetForm = {
    onSubmit: Function,
    onSaveMouvement: Function,
    onHide: Function,
    mouvement: any,
    match: any,
    history: any,
    lstCategories: Array
};

type StateBudgetForm = {
    id: number,
    date: string,
    amount: number,
    label: string,
    category: string
};

export default class BudgetForm extends React.Component<
    PropsBudgetForm,
    StateBudgetForm
> {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            amount: 0,
            label: '',
            category: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const idMouvement =
            this.props.match != null && this.props.match.params != null
                ? this.props.match.params.id
                : null;
        if (!idMouvement) {
            return;
        }
        makeFetch(`movements/${idMouvement}`).then(movement => {
            movement.date = moment(movement.date).format(CONSTANTS.DATE_FORMAT);
            this.setState(movement);
        });
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === 'category') {
            value = this.props.lstCategories.find(c => c.id === Number(value));
        }

        this.setState({
            [name]: value
        });
    }

    /**
     * Ce composant peut être instancé de 2 façons:
     * - Par le Router avec l'id du mouvement dans le path
     * - Depuis le composant Budget pour la création d'un nouveau mouvement
     *
     * Le traitement du submit est un peu différent.
     * @param event
     */
    handleSubmit(event) {
        event.preventDefault();
        let mouvement = {
            id: this.state.id !== undefined ? this.state.id : null,
            year: moment(this.state.date, CONSTANTS.DATE_FORMAT).format('YYYY'),
            month: moment(this.state.date, CONSTANTS.DATE_FORMAT).format('MM'),
            date: moment(this.state.date, CONSTANTS.DATE_FORMAT).format(),
            amount: parseFloat(this.state.amount),
            label: this.state.label,
            category: this.state.category
        };

        this.props.onSaveMouvement(mouvement);

        // Si instancié depuis Budget on a la méthode onHide qui réinitialise le state du composant Budget
        if (this.props.onHide !== undefined) {
            this.props.onHide();
        }

        // Et dans tous les cas on redirige vers /mouvement
        this.props.history.push('/mouvement');

        this.setState({
            id: null,
            date: '',
            amount: 0,
            label: '',
            category: {}
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="date"
                            name="date"
                            placeholder="DD/MM/YYYY"
                            pattern="\d{2}\/\d{2}/\d{4}"
                            required
                            value={this.state.date}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">amount</label>
                        <input
                            type="number"
                            pattern="[0-9]+([\.,][0-9]+)?"
                            className="form-control"
                            id="amount"
                            name="amount"
                            required
                            value={this.state.amount}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="label">Libellé</label>
                        <input
                            type="text"
                            className="form-control"
                            id="label"
                            name="label"
                            value={this.state.label}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <InputCategorie
                        {...this.props}
                        categoryId={
                            this.state.category && this.state.category.id
                                ? this.state.category.id
                                : 0
                        }
                        handleInputChange={this.handleInputChange}
                    />

                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button className="primary" type="submit">
                        Save changes
                    </Button>
                </form>
            </div>
        );
    }
}
