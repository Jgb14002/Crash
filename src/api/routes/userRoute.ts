import express from 'express';
import UserController from '../controllers/userController';

class UserRoute {

    public readonly router: express.Router;
    private readonly controller: UserController;

    constructor() {
        this.router = express.Router();
        this.controller = new UserController();
        this.bindRoutes();
    }

    private bindRoutes(): void {
        this.router.get('/', this.controller.getUsers);
    }
}

export default new UserRoute().router;