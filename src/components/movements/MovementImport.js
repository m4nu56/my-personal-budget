import React, {useState} from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {IMPORT_BANK_DATA} from '../../constants/actions';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2)
    },
    input: {
        display: 'none'
    }
}));

const ImportBankDataForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const importedBankData = useSelector(state => state.rootReducer.importedBankData);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitted with', selectedFile);
        dispatch({ type: IMPORT_BANK_DATA, payload: selectedFile })
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                accept="text/csv"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(event) => setSelectedFile(event.target.files[0])}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" className={classes.button}>
                    Upload a csv
                </Button>
            </label>

            <div>
                {selectedFile && ( `name: ${selectedFile.name} - type: ${selectedFile.type} - size: ${selectedFile.size}` )}
            </div>

            <div>
                {importedBankData.length>0 && importedBankData.map(mouvement => `<h2>${mouvement.id}</h2>`)}
            </div>

            <br/>
            <Button type="submit" disabled={selectedFile==null} color={'primary'} variant={'contained'} className={classes.button}>
                Submit
            </Button>

        </form>
    );
};

const MovementImport = props => {

    return (
        <Card>
            <CardHeader title='Import bank data'/>
            <CardContent>
                <ImportBankDataForm/>
            </CardContent>
        </Card>
    );
};

export default MovementImport;
