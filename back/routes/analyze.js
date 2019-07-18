const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    // find all mouvements responding to the request filter criteria (date range)
    // and analyze data so it is resumed into a table organized by month in column and categories in line
    // with subdivision line by parent categories

    // res.send('respond with a resource');
    res.json({info: 'Node.js, Express, and Postgres API'});
});

module.exports = router;
