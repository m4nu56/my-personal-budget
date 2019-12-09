import React from 'react';
import Button from '@material-ui/core/Button';
import {CreateButton, Datagrid, DateField, ExportButton, List, NumberField, ReferenceField, TextField} from 'react-admin';
import Toolbar from '@material-ui/core/Toolbar';


const ListActions = ({
                         basePath,
                         currentSort,
                         displayedFilters,
                         exporter,
                         filters,
                         filterValues,
                         onUnselectItems,
                         resource,
                         selectedIds,
                         showFilter,
                         total
                     }) => {

    console.log(resource)

    return (
        <Toolbar>
            {filters && React.cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button'
            })}
            <CreateButton basePath={basePath}/>
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filter={filterValues}
                exporter={exporter}
            />
            <Button color="primary" onClick={() => console.log('custom action')}>Import movements</Button>
        </Toolbar>
    );
}

export const MovementList = props =>{
    return (
    <List {...props} actions={<ListActions />}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="year"/>
            <TextField source="month"/>
            <DateField source="date"/>
            <NumberField source="amount"/>
            <TextField source="label"/>
            <ReferenceField source="category_id" reference="categories"><TextField source="name"/></ReferenceField>
            <NumberField source="category.id"/>
        </Datagrid>
    </List>
)};
