import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

const AnalyzeRow = props => {
    const {categorySummary, categories} = props;
    let category;
    if (categories) {
        category = categories.find(c => c.id === Number(categorySummary.category));
    }
    if (!category) {
        category = {
            id: Number(categorySummary.category),
            name: 'Undefined'
        };
    }
    const categoryId = category.id;

    let index = 1;
    let sum = [];
    let rows = [];
    let yearSum = 0.0;

    while (index <= 12) {
        sum[index] = getSumByMonth(categorySummary.data, index);
        rows.push(<TableCell key={`${categoryId}_${index}`}>{sum[index]}</TableCell>);
        yearSum = yearSum + sum[index];
        index++;
    }

    return (
        <TableRow key={categorySummary.category}>
            <TableCell component="th" scope="row">
                {category.name} (id: {category.id})
            </TableCell>
            {rows}
            <TableCell align="right">{yearSum}</TableCell>
        </TableRow>
    );
};

function getSumByMonth(categorySumMonth, month) {
    return Number(
        categorySumMonth.find(a => a.month === month)
            ? categorySumMonth.find(a => a.month === month).total
            : 0.0
    );
}

export default AnalyzeRow;
