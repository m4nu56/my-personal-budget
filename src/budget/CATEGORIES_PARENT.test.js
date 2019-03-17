import React from 'react';
import {CATEGORIES} from './CATEGORIES';
import '../setUpTests';

it('finds children category from categoy parent', () => {
    console.log(CATEGORIES[0]);
    const children = CATEGORIES.filter(c => c.parent === 'REVENUS');
    console.log(children);
});
