// @flow

import React from 'react';
import {Button} from 'react-bootstrap';
import InputCategorie from './InputCategorie';
import fire from '../../fire';
import moment from 'moment';
import CONSTANTS from '../../Constants';

type PropsBudgetForm = {
    onSubmit: Function,
    handleSaveMouvement: Function,
    onHide: Function,
    mouvement: any,
    match: any,
    history: any
};

type StateBudgetForm = {
    id: number,
    date: string,
    montant: number,
    libelle: string,
    categorie: string
};

export default class BudgetForm extends React.Component<PropsBudgetForm, StateBudgetForm> {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            montant: '',
            libelle: '',
            categorie: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const idMouvement = this.props.match != null && this.props.match.params != null ? this.props.match.params.id : null;
        if (!idMouvement) {
            return;
        }
        let mouvementRef = fire
            .database()
            .ref('mouvements')
            .child(idMouvement);

        mouvementRef.on('value', snapshot => {
            const mouvement = snapshot.val();
            this.setState({
                id: idMouvement,
                date: moment(mouvement.date, CONSTANTS.DATE_FORMAT_DB).format(CONSTANTS.DATE_FORMAT),
                montant: mouvement.montant,
                libelle: mouvement.libelle,
                categorie: mouvement.categorie
            });
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let mouvement = {
            id: this.state.id !== undefined ? this.state.id : null,
            date: moment(this.state.date, CONSTANTS.DATE_FORMAT).format(CONSTANTS.DATE_FORMAT_DB),
            montant: this.state.montant,
            libelle: this.state.libelle,
            categorie: this.state.categorie
        };
        this.props.handleSaveMouvement(mouvement);
        this.props.history.push('/mouvement');

        this.setState({
            id: null,
            date: '',
            montant: '',
            libelle: '',
            categorie: ''
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
                        <label htmlFor="montant">Montant</label>
                        <input
                            type="text"
                            pattern="[0-9]+([\.,][0-9]+)?"
                            className="form-control"
                            id="montant"
                            name="montant"
                            required
                            value={this.state.montant}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="libelle">Libellé</label>
                        <input type="text" className="form-control" id="libelle" name="libelle" value={this.state.libelle} onChange={this.handleInputChange} />
                    </div>
                    <InputCategorie categorie={this.state.categorie} handleInputChange={this.handleInputChange} />

                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button className="primary" type="submit">
                        Save changes
                    </Button>
                </form>
            </div>
        );
    }
}
