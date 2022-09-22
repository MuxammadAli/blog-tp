import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from "typeorm"
import { Post } from "./Post";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';


export enum RoleType {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;


    @Column({
        type: 'enum',
        enum: RoleType,
        default: RoleType.USER
    })
    role: RoleType.USER;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12)
    }

    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
    ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }


    toJson() {
        return {...this, password: undefined};
    }
}


