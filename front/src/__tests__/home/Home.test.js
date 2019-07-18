import React from 'react';
import Home from '../../home/Home';
import {shallow} from 'enzyme';
import '../../setUpTests';

it('renders without crashing', () => {
    shallow(<Home />);
});
