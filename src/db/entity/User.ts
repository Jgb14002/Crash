import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Check } from 'typeorm';

export enum UserRole {
    Admin   = 'admin',
    Player  = 'player'
}

@Entity('Users')
@Check(`"balance" >= 0 AND "total_wager" >= 0 AND "total_games" >= 0`)
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        name: 'username',
        length: 25,
        unique: true,
        update: false
    })
    username: string;

    @Column({
        type: 'text',
        name: 'password'
    })
    password: string;

    @Column({
        type: 'text',
        name: 'email',
        unique: true
    })
    email: string;

    @Column({
        type: 'timestamp without time zone',
        name: 'join_date',
        default: () => 'CURRENT_TIMESTAMP',
        update: false
    })
    joinDate: string

    @Column({
        type: 'enum',
        name: 'user_roles',
        enum: [UserRole.Admin, UserRole.Player],
        array: true,
        default: [UserRole.Player]
    })
    roles: UserRole[]

    @Column({
        type: 'varchar',
        name: 'nickname',
        length: 25
    })
    nickName: string

    @Column({
        type: 'boolean',
        name: 'verified',
        default: false
    })
    verified: boolean

    @Column({
        type: 'text',
        name: 'avatar',
        nullable: true
    })
    avatar?: string

    @Column({
        type: 'bigint',
        name: 'balance',
        default: 0
    })
    balance: number

    @Column({
        type: 'bigint',
        name: 'net_profit',
        default: 0
    })
    netProfit: number

    @Column({
        type: 'bigint',
        name: 'total_wager',
        default: 0
    })
    totalWagered: number

    @Column({
        type: 'integer',
        name: 'total_games',
        default: 0
    })
    totalGames: number
}