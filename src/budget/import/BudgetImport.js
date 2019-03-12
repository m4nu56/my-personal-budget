// @flow

import React from 'react';
import {Button} from 'react-bootstrap';
import {findCategoryByLibelle} from '../Categories';
import moment from 'moment';
import parseDecimalNumber from 'parse-decimal-number';
import CONSTANTS from '../../Constants';
import fire from '../../fire';
import './budget.css';
import DataGrid, {Column, FilterRow, Grouping, GroupPanel, Pager, Paging, Selection} from 'devextreme-react/data-grid';

type PropsBudgetImport = {
    onSubmit: Function,
    lstMouvement: Array,
    history: any,
    onHide: Function,
    match: any
};

type StateBudgetImport = {};

export default class BudgetImport extends React.Component<PropsBudgetImport, StateBudgetImport> {
    constructor(props) {
        super(props);
        console.log('props', props);
        this.state = {
            import:
                '05-03-2019	Prêt 1% Patronal	PRLV SEPA ALS ACTION LOGEMENT SERVICES ECH/050319 ID EMETTEUR/FR30ZZZ822E81 MDT/PER00200003246 REF/000012928571LOANSN LIB/000012928571LOANSN	-70,67 €',
            mouvementLst: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                import: event.target.value
            },
            () => {
                let mouvementLst = [];
                this.state.import.split('\n').forEach(row => {
                    let colRow = row.split('\t');
                    let categorie = findCategoryByLibelle(colRow[2]);

                    let montant = 0.0;
                    if (colRow[3]) {
                        montant = parseDecimalNumber(colRow[3].replace('€', ''), CONSTANTS.DECIMAL_NUMBER_OPTIONS);
                    }
                    if (montant.isNaN) {
                        return;
                    }
                    let date = colRow[0];
                    if (moment(colRow[0]).isValid()) {
                        date = moment(colRow[0]).format(CONSTANTS.DATE_FORMAT);
                    } else {
                        return;
                    }

                    let mouvement = {
                        date: date,
                        categorie: categorie ? categorie.name : colRow[1],
                        libelle: colRow[2],
                        montant: montant
                    };

                    // On test si le mouvement n'est pas déjà présent dans la liste
                    this.props.lstMouvement.forEach(m => {
                        if (m.date === mouvement.date && m.montant === mouvement.montant && m.libelle === mouvement.libelle) {
                            mouvement.duplicated = true;
                        }
                    });

                    mouvementLst.push(mouvement);
                });
                this.setState({
                    mouvementLst: mouvementLst
                });
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        // this.props.handleImport(this.state.mouvementLst);

        // on save les nouveaux mouvements en base
        this.state.mouvementLst.forEach(mouvement => {
            if (!mouvement.duplicated) {
                fire.database()
                    .ref('mouvements/')
                    .push(mouvement);
            }
        });

        this.props.history.push('/mouvement');
    }
    onHide(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="input-import">Import</label>
                        <textarea
                            className="form-control"
                            id="input-import"
                            name="input-import"
                            placeholder=""
                            required
                            value={this.state.import}
                            onChange={this.handleChange}
                        />
                    </div>

                    <DataGrid dataSource={this.state.mouvementLst} allowColumnReordering={true}>
                        <GroupPanel visible={true} />
                        <Grouping autoExpandAll={true} />
                        <FilterRow visible={true} />
                        <Selection mode={'multiple'} />

                        <Column dataField={'date'} dataType={'date'} width={150} />
                        <Column dataField={'libelle'} sortOrder={'asc'} />
                        <Column dataField={'categorie'} />
                        <Column dataField={'montant'} format={'currency'} width={100} />

                        <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
                        <Paging defaultPageSize={10} />
                    </DataGrid>

                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button bsStyle="primary" type="submit">
                        Import
                    </Button>
                </form>
            </div>
        );
    }
}
