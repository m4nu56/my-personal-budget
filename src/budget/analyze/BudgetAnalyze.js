import React from 'react';
import CATEGORIES_PARENT from '../CATEGORIES_PARENT';
import AnalyzeRow from './AnalyzeRow';
import PropTypes from 'prop-types';

export default class BudgetAnalyze extends React.Component {
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        let rows = [];
        CATEGORIES_PARENT.forEach(parent => {
            rows.push(
                <tr key={parent.name}>
                    <td colSpan={13}>{parent.name}</td>
                </tr>
            );
            rows.push(<AnalyzeRow parent={parent} lstMouvement={this.props.lstMouvement} />);
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
    lstMouvement: PropTypes.array
};
