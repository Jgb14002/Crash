import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User, UserRole } from '../entity/User';

export class CreateAdminUser1583017302097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = 'LoudPacks';
        user.password = 'password';
        user.email = 'admin@dev.com';
        user.roles = [UserRole.Admin, UserRole.Player];

        const repo = getRepository(User);
        await repo.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> { }
}
