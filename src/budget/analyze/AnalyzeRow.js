import React from 'react';
import PropTypes from 'prop-types';

const AnalyzeRow = props => {
    const {categorySummary, lstCategories} = props;
    const category = lstCategories.find(c => c.id === Number(categorySummary[0]));
    const categoryId = category.id;

    let index = 1;
    let sum = [];
    let rows = [];
    let yearSum = 0.0;

    while (index <= 12) {
        sum[index] = getSumByMonth(categorySummary[1], index);
        rows.push(<td key={`${categoryId}_${index}`}>{sum[index]}</td>);
        yearSum = yearSum + sum[index];
        index++;
    }

    return (
        <tr key={categorySummary[0]}>
            <td>{category.name} ({category.id})</td>
            {rows}
            <td>{yearSum}</td>
        </tr>
    );
};

function getSumByMonth (categorySumMonth, month) {
    return Number(
        categorySumMonth.find(a => a.month === month) ? categorySumMonth.find(a => a.month === month).total : 0.0
    );
}

AnalyzeRow.propTypes = {
    categorySummary: PropTypes.array,
    lstCategories: PropTypes.array,
};

export default AnalyzeRow;
