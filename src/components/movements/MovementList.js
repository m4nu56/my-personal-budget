import React from 'react';
import {Datagrid, DateField, List, NumberField, ReferenceField, TextField} from 'react-admin';
import {MovementListActions} from './MovementListActions';

export const MovementList = props =>{
    return (
    <List {...props} actions={<MovementListActions {...props} />}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="year"/>
            <TextField source="month"/>
            <DateField source="date"/>
            <NumberField source="amount"/>
            <TextField source="label"/>
            <ReferenceField source="categoryId" reference="categories"><TextField source="name"/></ReferenceField>
            <NumberField source="categoryId"/>
        </Datagrid>
    </List>
)};
