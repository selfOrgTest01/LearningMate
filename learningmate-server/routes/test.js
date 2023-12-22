const express = require('express');
const router = express.Router();
const db = require('../src/database');

//반드시 url 앞에 /빼먹지말것
router.get('/test/data', (req, res) => {
    db.query('SELECT * FROM users')
        .then((result) => {
            res.json({ message: 'Hello from the server!', resdata: result[0][0] });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
