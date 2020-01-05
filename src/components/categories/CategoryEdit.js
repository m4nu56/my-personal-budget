import React from 'react';
import {Edit, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from 'react-admin';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  // flexWrap: 'wrap', flexFlow: 'row wrap', justifyContent: 'space-around'
  // flexContainer: { display: 'flex', flexWrap: 'wrap' },
  flexContainer: { },
  flexItem: { display: 'inline-flex', marginRight: '1rem', flex: '1 1 40%' }
}

export const CategoryEdit = withStyles(styles)(({ classes, ...props }) => (
  <Edit {...props}>
      <SimpleForm>
          <NumberInput source='id' label='ID'/>
          <TextInput source='name' validate={required()}/>
          <ReferenceInput label='Catégorie parent' source='parentId' reference='categories'>
              <SelectInput optionText='name'/>
          </ReferenceInput>
      </SimpleForm>
  </Edit>
))
