import express from 'express';
import controller, { UserController } from '../controllers/userController';

class UserRoute {

    public readonly router: express.Router;
    private readonly controller: UserController;

    constructor() {
        this.router = express.Router();
        this.controller = controller;
        this.bindRoutes();
    }

    private bindRoutes(): void {
        this.router.get('/', this.controller.getUsers);
        this.router.get('/:userId', this.controller.getUserById);
    }
}

export default new UserRoute().router;