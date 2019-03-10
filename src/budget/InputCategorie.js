// @flow

import React from 'react';
import { categories } from './Categories';
import PropTypes from 'prop-types';

const InputCategorie = props => {
    const optionCategories = Object.keys(categories).map(c => <option key={c}>{categories[c].libelle}</option>);

    return (
        <div className="form-group">
            <label htmlFor="categorie">Catégorie</label>
            <select
                className="form-control"
                id="categorie"
                name="categorie"
                required
                value={props.categorie}
                onChange={props.handleInputChange}
            >
                <option />
                {optionCategories}
            </select>
        </div>
    );
};

InputCategorie.propTypes = {
    categorie: PropTypes.string,
    handleInputChange: PropTypes.func
};

export default InputCategorie;
