import React from 'react';
import {Column, FilterRow, Grouping, GroupPanel, Pager, Paging, Selection} from 'devextreme-react/data-grid';
import DataGrid from './BudgetImport';
import PropTypes from 'prop-types';

const BudgetImportList = props => {
    return (
        <DataGrid dataSource={props.lstMouvement} allowColumnReordering={true}>
            <GroupPanel visible={true} />
            <Grouping autoExpandAll={true} />
            <FilterRow visible={true} />
            <Selection mode={'multiple'} />

            <Column dataField={'year'} width={50} />
            <Column dataField={'month'} width={50} />
            <Column dataField={'date'} dataType={'date'} width={150} />
            <Column dataField={'libelle'} sortOrder={'asc'} />
            <Column dataField={'categorie'} />
            <Column dataField={'montant'} format={'currency'} width={100} />

            <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
        </DataGrid>
    );
};

BudgetImportList.propTypes = {
    lstMouvement: PropTypes.array
};

export default BudgetImportList;
