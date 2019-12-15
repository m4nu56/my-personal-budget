import React from 'react';
import {SaveButton} from 'ra-ui-materialui'
import {SimpleForm, TextInput} from 'react-admin';

function MovementImportForm ({...props}) {
    const {isSubmitting} = props;
    return <SimpleForm save={props.save}
                       toolbar={null}
                       onSubmit={props.save}
                       initialValues={props.initialValues}>
        <TextInput multiline source="body" resettable fullWidth={true}/>
        <SaveButton saving={isSubmitting} onClick={props.save}/>
    </SimpleForm>;
}

const MovementImport = props => {

    const importRecord = {
        body: 'ABCD1234'
    };

    return (
        <div>
            <h1>Imports</h1>
            <pre>{importRecord.body}</pre>
            <MovementImportForm save={(submit) => alert('form saved', submit)} initialValues={importRecord}/>
        </div>
    );
};

export default MovementImport;
