import BudgetList from './BudgetList'
import React from 'react'
import BudgetForm from './BudgetForm'

export default class Budget extends React.Component {
    constructor (props) {
        super(props)

        const lstMouvement = [
            {id: 1, date: '10/04/2018', montant: 123.22, libelle: 'medecin', categorie: 1},
            {id: 2, date: '11/05/2019', montant: 2123.22, libelle: 'pharmacie', categorie: 2},
            {id: 3, date: '12/06/2020', montant: 3123.22, libelle: 'supermarché', categorie: 3},
            {id: 4, date: '13/07/2021', montant: 4123.22, libelle: 'restaurant', categorie: 5},
        ]

        this.state = {
            lstMouvement: lstMouvement,
            mouvementEdited: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleHide = this.handleHide.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    handleSubmit (mouvement) {
        console.log(mouvement)

        let newLstMouvement = this.state.lstMouvement.slice()
        // si on est en create on insert le nouvement mouvement
        if (this.state.mouvementEdited === null) {
            newLstMouvement.push(mouvement)
        } else {
            // sinon on remplace le mouvement modifié dans la liste
            newLstMouvement = newLstMouvement.map(mvt => {
                // console.log(mvt)
                if (mvt.id === mouvement.id) {
                    console.log(mouvement.id)
                    return mouvement
                } else {
                    return mvt
                }
            })
        }

        this.setState({
            lstMouvement: newLstMouvement,
            mouvementEdited: null,
        })
    }

    handleHide () {
        this.setState({
            mouvementEdited: null,
        })
    }

    handleEdit (mouvement) {
        console.log('handleEdit=')
        console.log(mouvement)
        this.setState({
            mouvementEdited: mouvement,
        })
    }

    render () {

        let content = <BudgetList lstMouvement={this.state.lstMouvement} onEdit={this.handleEdit}/>
        if (this.state.mouvementEdited != null) {
            content = <BudgetForm onSubmit={this.handleSubmit} onHide={this.handleHide} mouvement={this.state.mouvementEdited}/>
        }

        return (
            <div className="text-center">

                <button className="btn btn-sm btn-primary m-2" onClick={() => this.setState({showModal: true})}>
                    <i className="glyphicon glyphicon-plus"/> Ajouter un mouvement
                </button>

                {content}


            </div>
        )
    }
}
