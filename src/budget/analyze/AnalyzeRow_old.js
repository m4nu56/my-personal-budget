import {CATEGORIES} from '../CATEGORIES';
import React from 'react';
import PropTypes from 'prop-types';

const AnalyzeRow = props => {
    return CATEGORIES.filter(c => c.parent === props.parent.name).map(c => {
        let tblValues = props.analyzeMovements.filter(m => m.category === c.name).map(m => (Array[m.month] = m.total ? m.total : 0.0));

        return (
            <tr key={`child_${c.name}`}>
                <td>{c.name}</td>
                <td>{tblValues[0]}</td>
                <td>{tblValues[1]}</td>
                <td>{tblValues[2]}</td>
                <td>{tblValues[3]}</td>
                <td>{tblValues[4]}</td>
                <td>{tblValues[5]}</td>
                <td>{tblValues[6]}</td>
                <td>{tblValues[7]}</td>
                <td>{tblValues[8]}</td>
                <td>{tblValues[9]}</td>
                <td>{tblValues[10]}</td>
                <td>{tblValues[11]}</td>
                <td>totl annee</td>
            </tr>
        );
    });
};

AnalyzeRow.propTypes = {
    parent: PropTypes.object,
    key: PropTypes.string
};

export default AnalyzeRow;
