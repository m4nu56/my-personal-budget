const moment = require('moment');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'budget',
    password: 'MxM64B7FEM8ReBigg1',
    port: 5439
});

const getMovements = (request, response) => {
    let query = 'SELECT * FROM t_movement';
    let requestParameters = null;
    if (request.query.category !== undefined) {
        query += ' WHERE category = $1';
        requestParameters = [request.query.category];
    }
    query += ' ORDER BY id ASC';
    pool.query(query, requestParameters, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getMovementById = (request, response) => {
    console.log(request.query);
    console.log(request.params);
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM t_movement WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createMovement = (request, response) => {
    console.log('creating mouvement with data: ');
    console.log(request.body);
    const {date, amount, label, category} = request.body;

    pool.query(
        'INSERT INTO t_movement (year, month, date, amount, label, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [moment(date, 'X').format('DD'), moment(date, 'X').format('MM'), date, amount, label, category],
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results.rows);
            response.status(201).send(`Movement added with ID: ${results.rows[0].id}`);
        }
    );
};

const updateMovement = (request, response) => {
    const id = parseInt(request.params.id);
    const {date, amount, label, category} = request.body;

    pool.query(
        'UPDATE t_movement SET year = $2, month = $3, date= $4, amount= $5, label= $6, category = $7 WHERE id = $1',
        [id, moment(date, 'X').format('DD'), moment(date, 'X').format('MM'), date, amount, label, category],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Movement modified with ID: ${id}`);
        }
    );
};

const deleteMovement = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM t_movement WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Movement deleted with ID: ${id}`);
    });
};

module.exports = {
    getMovements,
    getMovementById,
    createMovement,
    updateMovement,
    deleteMovement
};
