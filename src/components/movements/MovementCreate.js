import React from 'react';
import {Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput, DateInput} from 'react-admin';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  // flexWrap: 'wrap', flexFlow: 'row wrap', justifyContent: 'space-around'
  // flexContainer: { display: 'flex', flexWrap: 'wrap' },
  flexContainer: { },
  flexItem: { display: 'inline-flex', marginRight: '1rem', flex: '1 1 40%' }
}

export const MovementCreate = withStyles(styles)(({ classes, ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <DateInput source='date' validate={required()} defaultValue={new Date()} />
      <TextInput source='amount' validate={required()} />
      <TextInput source='label' />
      <ReferenceInput label='Catégorie' source='id_category' reference='categories'>
        <SelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Create>
))
