import React from 'react';
import {Admin, Resource} from 'react-admin';
import dataProvider from './providers/dataProvider';
import {MovementEdit, MovementCreate, MovementList} from './components/movements';
import {CategoryEdit, CategoryList, CategoryCreate} from './components/categories';
import Dashboard from './pages/Dashboard';
import watchAll from './sagas/api-saga';
import rootReducer from './reducers';
import AppLayout from './layout/AppLayout';
import customRoutes from './customRoutes';

const App = () => <Admin dataProvider={dataProvider}
                         dashboard={Dashboard}
                         layout={AppLayout}
                         customRoutes={customRoutes}
                         customSagas={[watchAll]}
                         customReducers={{ rootReducer }}>

  <Resource name="movements" list={MovementList} edit={MovementEdit} create={MovementCreate} />
  <Resource name="categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />

</Admin>

export default App
