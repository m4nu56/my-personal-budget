import React from 'react';

import DataGrid, {Column, FilterRow, Grouping, GroupPanel, Pager, Paging, Selection} from 'devextreme-react/data-grid';

import {sales, selectedKeys} from './data';

export default class DevExtremeTest extends React.Component {
    render() {
        return (
            <DataGrid dataSource={sales} keyExpr={'orderId'} allowColumnReordering={true} defaultSelectedRowKeys={selectedKeys}>
                <GroupPanel visible={true} />
                <Grouping autoExpandAll={true} />
                <FilterRow visible={true} />
                <Selection mode={'multiple'} />

                <Column
                    dataField={'orderId'}
                    caption={'Order ID'}
                    allowSorting={false}
                    allowFiltering={false}
                    allowGrouping={false}
                    allowReordering={false}
                    width={100}
                />
                <Column dataField={'city'} />
                <Column dataField={'country'} sortOrder={'asc'} />
                <Column dataField={'region'} groupIndex={0} />
                <Column dataField={'date'} dataType={'date'} selectedFilterOperation={'>='} filterValue={'2013/04/01'} width={150} />
                <Column dataField={'amount'} format={'currency'} selectedFilterOperation={'>='} filterValue={1000} width={100} />

                <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
                <Paging defaultPageSize={10} />
            </DataGrid>
        );
    }
}
