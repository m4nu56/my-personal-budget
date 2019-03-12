import React from 'react';
import {shallow} from 'enzyme';
import {CATEGORIES} from './Categories';
import {findCategoryByLibelle} from './Categories';
import '../setUpTests';

it('finds corresponding category', () => {
    const category = findCategoryByLibelle('VIR SEPA RECU /DE SARL DEV1 0 de');
    expect(category.name).toEqual('SALAIRE_MANU');
});

it('finds no category', () => {
    const category = findCategoryByLibelle('BAD LIBELLE');
    expect(category).toEqual(null);
});
