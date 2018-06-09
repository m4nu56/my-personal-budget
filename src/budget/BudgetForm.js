// @flow

import React from 'react';
import ModalHeader from './budget-form/ModalHeader';
import ModalFooter from './budget-form/ModalFooter';

type Props = {};

export default class BudgetForm extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            montant: '',
            libelle: '',
            categorie: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
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

    render() {
        return (
            <div id="exampleModal" className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <ModalHeader title="Nouveau mouvement" />

                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        name="date"
                                        value={this.state.date}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="montant">Montant</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="montant"
                                        name="montant"
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
                                        value={this.state.categorie}
                                        onChange={this.handleInputChange}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </form>
                        </div>

                        <ModalFooter />
                    </div>
                </div>
            </div>
        );
    }
}
