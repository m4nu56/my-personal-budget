import React from 'react';
import PropTypes from 'prop-types';

const AnalyzeRow = props => {
    const {category, key} = props;
    let i = 1;
    let sum = [];
    let rows = [];
    let yearSum = 0.0;
    while (i <= 12) {
        sum[i] = Number(
            category[1].find(a => a.month === i)
                ? category[1].find(a => a.month === i).total
                : 0.0
        );
        rows.push(<td>{sum[i]}</td>);
        yearSum = yearSum + sum[i];
        i++;
    }
    return (
        <tr key={`${key}`}>
            <td>{category[0]}</td>
            {rows}
            <td>{yearSum}</td>
        </tr>
    );
};

AnalyzeRow.propTypes = {
    category: PropTypes.array,
    key: PropTypes.string
};

export default AnalyzeRow;
