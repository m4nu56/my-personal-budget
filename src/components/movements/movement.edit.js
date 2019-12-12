import React from 'react';
import {Edit, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput, DateInput} from 'react-admin';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  // flexWrap: 'wrap', flexFlow: 'row wrap', justifyContent: 'space-around'
  // flexContainer: { display: 'flex', flexWrap: 'wrap' },
  flexContainer: { },
  flexItem: { display: 'inline-flex', marginRight: '1rem', flex: '1 1 40%' }
}

export const MovementEdit = withStyles(styles)(({ classes, ...props }) => (
  <Edit {...props}>
    <SimpleForm>
      <NumberInput source='id' disabled label='ID' />
      <TextInput source='year' validate={required()} />
      <TextInput source='month' validate={required()} />
      <DateInput source='date' validate={required()} />
      <TextInput source='amount' validate={required()} />
      <TextInput source='label' />
      <ReferenceInput label='Catégorie' source='category_id' reference='categories'>
        <SelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
))
