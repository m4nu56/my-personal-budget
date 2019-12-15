import React from 'react';
import Button from '@material-ui/core/Button';
import {CreateButton, ExportButton} from 'react-admin';
import Toolbar from '@material-ui/core/Toolbar';
import BackupIcon from '@material-ui/icons/Backup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export const MovementListActions = ({basePath, currentSort, displayedFilters, exporter, filters, filterValues, onUnselectItems, resource, selectedIds, showFilter, total, history}) => {
    const classes = useStyles();
    return (
        <Toolbar>
            {filters && React.cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button'
            })}
            <CreateButton basePath={basePath}/>
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filter={filterValues}
                exporter={exporter}
            />
            <Button size="small" color="primary" onClick={() => history.push('/movements/import')}>
                <BackupIcon className={classes.extendedIcon}/> Import movements
            </Button>

        </Toolbar>
    );
};
