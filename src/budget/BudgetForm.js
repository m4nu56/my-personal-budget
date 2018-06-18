// @flow

import React from 'react'
import { Button } from 'react-bootstrap'

type PropsBudgetForm = {
    onSubmit: Function,
    onHide: Function,
    mouvement: any
};

type StateBudgetForm = {
    id: number,
    date: string,
    montant: number,
    libelle: string,
    categorie: string
};

export default class BudgetForm extends React.Component<PropsBudgetForm, StateBudgetForm> {
    constructor (props) {
        super(props)

        console.log('constructor budgetform match=')
        console.log(props.mouvement)

        let mouvement = {
            id: 0,
            date: '10/01/2018',
            montant: '0110',
            libelle: '',
            categorie: '1',
        }
        if (this.props.mouvement != null) {
            mouvement = this.props.mouvement
        }

        this.state = {
            id: mouvement.id,
            date: mouvement.date,
            montant: mouvement.montant,
            libelle: mouvement.libelle,
            categorie: mouvement.categorie,
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange (event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value,
        })

        console.log(value)
    }

    handleSubmit (event) {
        event.preventDefault()
        let mouvement = {
            id: this.state.id,
            date: this.state.date,
            montant: this.state.montant,
            libelle: this.state.libelle,
            categorie: this.state.categorie,
        }
        console.log(mouvement)
        if (mouvement.id === 0) {
            mouvement.id = Math.floor(Math.random() * 1000) + 1
        }
        this.props.onSubmit(mouvement)
        this.setState({
            id: 0,
            date: '',
            montant: '',
            libelle: '',
            categorie: '',
        })
    }

    render () {

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
                            <option/>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>

                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button bsStyle="primary" type="submit">
                        Save changes
                    </Button>
                </form>
            </div>
        )
    }
}
