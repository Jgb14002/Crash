import express from 'express';
import userRoute from './userRoute';

class Router {

    public readonly router: express.Router;

    constructor() {
        this.router = express.Router();
        this.bindRoutes();
    }

    private bindRoutes(): void {
        this.router.use('/user', userRoute);
    }
}

export default new Router().router;
