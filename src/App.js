import React from 'react';
import {Admin, ListGuesser, Resource} from 'react-admin';
import dataProvider from './providers/dataProvider';
import {MovementEdit} from './components/movements/movement.edit';
import {MovementCreate} from './components/movements/movement.create';
import {CategoryCard} from './components/categories/category.card';
import {MovementList} from './components/movements/movements.list';
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
  <Resource name="categories" list={ListGuesser} edit={CategoryCard}/>
</Admin>

export default App
