import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import bodyParser from 'body-parser';
import apiRouter from './api/routes/apiRouter';
import { Error } from './models/Error';

class App {

    public app: express.Application = express();

    constructor() {
        this.init();
        this.bindRoutes();
    }

    private init(): void {
        createConnection().then().catch(error => {
            console.log(error);
        });

        this.app.use(morgan('dev'));

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            );
            if(req.method === 'OPTIONS') {
                res.header(
                    'Access-Control-Allow-Methods',
                    'PUT, POST, PATCH, DELETE, GET'
                );
                return res.status(200).json({});
            }
            next();
        });
    }

    private bindRoutes(): void {
        this.app.use('/v1', apiRouter);

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const error = new Error(404, 'Not Found');
            next(error);
        });

        this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(error.status || 500);
            res.json({
                error: {
                    message: error.message
                }
            });
        });
    }
}

export default new App().app;