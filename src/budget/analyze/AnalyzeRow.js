import {CATEGORIES} from '../CATEGORIES';
import React from 'react';
import PropTypes from 'prop-types';

const AnalyzeRow = props => {
    return CATEGORIES.filter(c => c.parent === props.parent.name).map(c => {
        let value = props.lstMouvement
            .filter(m => m.categorie === c.name)
            .map(m => m.montant)
            .reduce((prev, current) => parseFloat(prev) + parseFloat(current), 0);

        console.log(`${c.libelle} => ${value}`);

        return (
            <tr key={c.name}>
                <td>{c.name}</td>
                <td>{value}</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>0.0</td>
                <td>0.0</td>
            </tr>
        );
    });
};

AnalyzeRow.propTypes = {
    parent: PropTypes.object,
    key: PropTypes.string
};

export default AnalyzeRow;
