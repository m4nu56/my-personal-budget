// @flow

import React from 'react';
import PropTypes from 'prop-types';

const InputCategorie = props => {
    const {categoryId, handleInputChange, lstCategories} = props;

    const optionCATEGORIES = lstCategories.map(c => (
        <option key={c.id} value={c.id}>
            {c.name} ({c.id})
        </option>
    ));

    return (
        <div className="form-group">
            <label htmlFor="category">Catégorie</label>
            <select
                className="form-control"
                id="category"
                name="category"
                required
                value={categoryId}
                onChange={handleInputChange}
            >
                <option />
                {optionCATEGORIES}
            </select>
        </div>
    );
};

InputCategorie.propTypes = {
    categoryId: PropTypes.number,
    handleInputChange: PropTypes.func,
    lstCategories: PropTypes.array
};

export default InputCategorie;
