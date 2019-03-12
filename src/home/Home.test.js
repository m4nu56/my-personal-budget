import React from 'react';
import Home from './Home';
import {shallow} from 'enzyme';
import '../setUpTests';

it('renders without crashing', () => {
    shallow(<Home />);
});
