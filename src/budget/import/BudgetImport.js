// @flow

import React from 'react';
import {Button} from 'react-bootstrap';
import moment from 'moment';
import parseDecimalNumber from 'parse-decimal-number';
import CONSTANTS from '../../Constants';
import './budget.css';
import DataGrid, {Column, FilterRow, Grouping, GroupPanel, Pager, Paging, Selection} from 'devextreme-react/data-grid';
import {findCategoryByLabel} from '../CategoryUtils';

type PropsBudgetImport = {
    onSubmit: Function,
    lstMouvement: Array,
    history: any,
    match: any,
    onSaveMouvement: Function
};

type StateBudgetImport = {};

export default class BudgetImport extends React.Component<PropsBudgetImport, StateBudgetImport> {
    constructor(props) {
        super(props);
        this.state = {
            import:
                '05-03-2019	Prêt 1% Patronal	PRLV SEPA ALS ACTION LOGEMENT SERVICES ECH/050319 ID EMETTEUR/FR30ZZZ822E81 MDT/PER00200003246 REF/000012928571LOANSN LIB/000012928571LOANSN	-70,67 €',
            mouvementLst: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {
                import: event.target.value
            },
            () => this.createMouvementFromRows()
        );
    }

    createMouvementFromRows = () => {
        let mouvementLst = [];
        this.state.import.split('\n').forEach(row => {
            let colRow = row.split('\t');
            let categorie = findCategoryByLabel(colRow[2]);

            let amount;
            if (colRow[3]) {
                amount = parseDecimalNumber(colRow[3].replace('€', ''), CONSTANTS.DECIMAL_NUMBER_OPTIONS);
            }
            if (!amount || isNaN(amount)) {
                return;
            }
            let date = colRow[0];
            if (moment(colRow[0]).isValid()) {
                date = moment(colRow[0], 'DD-MM-YYYY');
            } else {
                return;
            }

            let mouvement = {
                year: date.format('YYYY'),
                month: date.format('M'),
                date: date.format(),
                category: categorie ? categorie.name : colRow[1],
                label: colRow[2],
                amount: amount
            };

            // On test si le mouvement n'est pas déjà présent dans la liste
            this.props.lstMouvement.forEach(m => {
                if (m.date === mouvement.date && m.amount === mouvement.amount && m.label === mouvement.label) {
                    mouvement.duplicated = true;
                }
            });

            mouvementLst.push(mouvement);
        });
        this.setState({
            mouvementLst: mouvementLst
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        // on save les nouveaux mouvements en base
        this.state.mouvementLst.forEach(mouvement => {
            if (!mouvement.duplicated) {
                this.props.onSaveMouvement(mouvement);
            }
        });

        this.props.history.push('/mouvement');
    };

    cancel(event) {
        event.preventDefault();
        this.props.history.push('/mouvement');
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

                        <Column dataField={'year'} width={100} />
                        <Column dataField={'month'} width={100} />
                        <Column dataField={'date'} dataType={'date'} width={150} />
                        <Column dataField={'label'} sortOrder={'asc'} />
                        <Column dataField={'category'} />
                        <Column dataField={'amount'} format={'currency'} width={100} />

                        <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
                        <Paging defaultPageSize={10} />
                    </DataGrid>

                    <Button onClick={this.cancel}>Cancel</Button>
                    <Button className="primary" type="submit">
                        Import
                    </Button>
                </form>
            </div>
        );
    }
}
