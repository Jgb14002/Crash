import { Request, Response, NextFunction } from 'express';

export default class UserController {
    public getUsers(req: Request, res: Response, next: NextFunction): void {
        res.status(200).json({
            message: 'Ok.'
        });
    }
}