import React, {useEffect} from 'react';
import {Title} from 'react-admin';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {CATEGORIES, DASHBOARD} from '../constants/actions';
import AnalyzeRow from './AnalyzeRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Dashboard = (props) => {

  const classes = useStyles();

  const dispatch = useDispatch();
  const dashboardData = useSelector(state => state.rootReducer.dashboardData);
  const categories = useSelector(state => state.rootReducer.categories);
  const count = useSelector(state => state.rootReducer.count);

  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    document.title = `Vous avez cliqué ${count} fois`;
  });

  useEffect(() => {
    dispatch({ type: DASHBOARD })
    dispatch({ type: CATEGORIES })
    dispatch({ type: 'increment-counter' })
    // eslint-disable-next-line
  }, [])

  const rows = dashboardData.map((dashboard, index) => <AnalyzeRow key={index} categorySummary={dashboard} categories={categories}/>)

  return (
      <Card>
        <Title title='Bienvenue'/>
        <CardHeader title='Tableau de bord'/>
        <CardContent>

          <p>Vous avez cliqué {count} fois</p>
          <button onClick={() => {
            dispatch({type: 'increment-counter'});
          }}>
            Cliquez ici
          </button>

          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category (2019)</TableCell>
                  <TableCell align="right">Janvier</TableCell>
                  <TableCell align="right">Février</TableCell>
                  <TableCell align="right">Mars</TableCell>
                  <TableCell align="right">Avril</TableCell>
                  <TableCell align="right">Mail</TableCell>
                  <TableCell align="right">Juin</TableCell>
                  <TableCell align="right">Juillet</TableCell>
                  <TableCell align="right">Août</TableCell>
                  <TableCell align="right">Septembre</TableCell>
                  <TableCell align="right">Octobre</TableCell>
                  <TableCell align="right">Novembre</TableCell>
                  <TableCell align="right">Décembre</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows}
              </TableBody>
            </Table>
          </Paper>

        </CardContent>
    </Card>
  )
}

export default Dashboard
