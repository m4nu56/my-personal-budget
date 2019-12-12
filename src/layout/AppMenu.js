import React, { createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';

const AppMenu = ({ onMenuClick }) => {
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    return (
        <div>
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={resource.options && resource.options.label || resource.name}
                    leftIcon={resource.icon && createElement(resource.icon)}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            <MenuItemLink
                to="/movements/import"
                primaryText="Imports"
                leftIcon={<LabelIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
        </div>
    );
};

export default withRouter(AppMenu);
