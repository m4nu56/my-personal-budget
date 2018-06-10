// @flow

import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type PropsBudgetForm = {
    onSubmit: Function,
    onHide: Function,
    show: boolean
};

type State = {
    date: string,
    montant: number,
    libelle: string,
    categorie: string
};

export default class BudgetForm extends React.Component<PropsBudgetForm, State> {
    constructor(props) {
        super(props);
        this.state = {
            date: '10/01/2018',
            montant: '0110',
            libelle: '',
            categorie: '1'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        console.log(value);
    }

    handleSubmit(event) {
        event.preventDefault();
        let mouvement = {
            date: this.state.date,
            montant: this.state.montant,
            libelle: this.state.libelle,
            categorie: this.state.categorie
        };
        mouvement.id = Math.floor(Math.random() * 1000) + 1;
        this.props.onSubmit(mouvement);
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show}>
                    <Modal.Header>
                        <Modal.Title>Nouveau mouvement</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={this.handleSubmit}>
                        <Modal.Body>
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
                                    pattern="\d+"
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
                                <input
                                    type="text"
                                    className="form-control"
                                    id="libelle"
                                    name="libelle"
                                    value={this.state.libelle}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categorie">Catégorie</label>
                                <select
                                    className="form-control"
                                    id="categorie"
                                    name="categorie"
                                    required
                                    value={this.state.categorie}
                                    onChange={this.handleInputChange}
                                >
                                    <option />
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.props.onHide}>Close</Button>
                            <Button bsStyle="primary" type="submit">
                                Save changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}
