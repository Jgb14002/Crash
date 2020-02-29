import { Request, Response, NextFunction } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../db/entity/User';
import { Error } from '../../models/Error';

export class UserController {

    private static _instance: UserController;

    private constructor() { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public async getUsers(req: Request, res: Response, next: NextFunction) {
        const repository = getRepository(User);
        const users = await repository.find({
            select: ['id', 'username']
        });
        res.status(200).json(users);
    }

    public async getUserById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const repository = getRepository(User);
        try {
            const user = await repository.findOneOrFail(userId);
            res.status(200).json(user);
        } catch (error) {
            next(new Error(404, 'User not found'));
        }
    }
}

export default UserController.Instance;