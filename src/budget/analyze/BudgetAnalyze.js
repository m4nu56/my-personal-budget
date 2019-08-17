import React from 'react';
import AnalyzeRow from './AnalyzeRow';
import PropTypes from 'prop-types';
import {makeFetch} from '../../api';

export default class BudgetAnalyze extends React.Component {
    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            analyzeMovements: []
        };
    }

    componentWillMount(): void {
        makeFetch(`analyze/summary`).then(results => {
            this.setState(
                {
                    analyzeMovements: JSON.parse(results)
                },
                () => console.log(this.state.analyzeMovements)
            );
        });
    }

    render(): React.ReactNode {
        let rows = [];

        this.state.analyzeMovements.forEach((analyze, index) => {
            rows.push(
                <AnalyzeRow
                    {...this.props}
                    key={index}
                    categorySummary={analyze}
                />
            );
        });

        return (
            <div>
                <h1>Analyze</h1>
                <table className={'table table-striped'}>
                    <thead>
                        <tr>
                            <th>2019</th>
                            <th>Janvier</th>
                            <th>Février</th>
                            <th>Mars</th>
                            <th>Avril</th>
                            <th>Mail</th>
                            <th>Juin</th>
                            <th>Juillet</th>
                            <th>Août</th>
                            <th>Septembre</th>
                            <th>Octobre</th>
                            <th>Novembre</th>
                            <th>Décembre</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}

BudgetAnalyze.propTypes = {
    lstMouvement: PropTypes.array,
    lstCategories: PropTypes.array
};
