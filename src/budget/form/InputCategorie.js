// @flow

import React from 'react';
import {CATEGORIES} from '../CATEGORIES';
import PropTypes from 'prop-types';

const InputCategorie = props => {
    const optionCATEGORIES = CATEGORIES.map(c => (
        <option key={c.name} value={c.name}>
            {c.libelle}
        </option>
    ));

    return (
        <div className="form-group">
            <label htmlFor="categorie">Catégorie</label>
            <select className="form-control" id="categorie" name="categorie" required value={props.categorie} onChange={props.handleInputChange}>
                <option />
                {optionCATEGORIES}
            </select>
        </div>
    );
};

InputCategorie.propTypes = {
    categorie: PropTypes.string,
    handleInputChange: PropTypes.func
};

export default InputCategorie;
