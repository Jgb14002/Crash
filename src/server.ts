import config from './config/config.json';
import http from 'http';
import app  from './app';

process.env = config.development;

http.createServer(app).listen(process.env.PORT, () => {
    console.log(`Started server on port: ${process.env.PORT}`);
});