import React from 'react';
import Button from '@material-ui/core/Button';
import {CreateButton, ExportButton} from 'react-admin';
import Toolbar from '@material-ui/core/Toolbar';

export const ListActions = ({
                                basePath,
                                currentSort,
                                displayedFilters,
                                exporter,
                                filters,
                                filterValues,
                                onUnselectItems,
                                resource,
                                selectedIds,
                                showFilter,
                                total
                            }) => {

    console.log(resource);

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
            <Button color="primary" onClick={() => console.log('custom action')}>Import movements</Button>
        </Toolbar>
    );
};
