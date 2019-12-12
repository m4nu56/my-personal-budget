// in src/customRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import MovementImport from './components/movements/MovementImport';

export default [
    <Route exact path="/movements/import" component={MovementImport} />,
];
