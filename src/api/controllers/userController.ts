import { Request, Response, NextFunction } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../db/entity/User';
import { Error } from '../../models/Error';
import defaultValidator from '../../models/DefaultValidator';
import { validate } from 'class-validator'
import bcrypt from 'bcrypt';

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
            return next(new Error(404, 'User not found'));
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        const repository = getRepository(User);
        const user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;

        const errors = await validate(user, defaultValidator);
        if(errors.length > 0) {
            res.status(400).json({
                error: {
                    messages: errors
                }
            });
            return;
        }

       const hash = bcrypt.hashSync(user.password, 10);
       user.password = hash;
       try {
            let newUser = await repository.save(user);
            res.status(201).json({
                id: newUser.id,
                username: newUser.username
            });
       } catch (error) {
            return next(new Error(409, 'A user with that username or email already exists'))
       }
    }
}

export default UserController.Instance;