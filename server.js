const http = require('http');
const config = require('./config/config');
const app = require('./app');

const port = process.env.PORT;
const server = http.createServer(app);

server.listen(port);