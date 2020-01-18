import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import {useDispatch} from 'react-redux';
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
    return (
        <Formik
            initialValues={{bankData: ''}}
            validationSchema={Yup.object({
                bankData: Yup.string().required('Required')
            })}
            onSubmit={(values, {setSubmitting}) => {
                dispatch({ type: IMPORT_BANK_DATA, payload: values.bankData })
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="bankData"
                        name="bankData"
                        helperText={formik.touched.bankData ? formik.errors.bankData : ''}
                        error={formik.touched.bankData && Boolean(formik.errors.bankData)}
                        label="Paste bank data"
                        value={formik.values.bankData}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        multiline
                        rows="5"
                    />

                    <Button type="submit" disabled={formik.isSubmitting} color={'primary'} variant={'contained'} className={classes.button}>
                        Submit
                    </Button>

                    <div>
                        <input
                            accept="text/csv"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                    </div>
                </form>
            )}
        </Formik>
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
