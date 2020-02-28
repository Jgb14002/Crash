const express = require('express');
const app = express();

const apiRouter = require('./api/routes/router');

app.use('/v1', apiRouter);

module.exports = app;