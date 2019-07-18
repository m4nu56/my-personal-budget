const express = require('express');
const router = express.Router();
const db = require('./queries');

router.get('/', db.getMouvements);

router.put('/', (req, res) => {
    // puts a new mouvement to the db
});

router.delete('/{mouvementId}', (req, res) => {
    // delete a mouvement from the db
});

router.post('/{mouvementId}', (req, res) => {
    // updates an existing mouvement from the db
});

module.exports = router;
