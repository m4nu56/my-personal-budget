import {Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from 'react-admin';
import React from 'react';

export const CategoryCreate = ({...props}) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source='name' validate={required()}/>
            <ReferenceInput label='Catégorie parent' source='parentId' reference='categories'>
                <SelectInput optionText='name'/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
