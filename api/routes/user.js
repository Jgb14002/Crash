const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Ok."
    })
});

router.get('/:userID', (req, res, next) => {
    res.status(200).json({
        message: "Ok."
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Ok."
    })
});

router.patch('/:userID', (req, res, next) => {
    res.status(200).json({
        message: "Ok."
    })
});

module.exports = router;