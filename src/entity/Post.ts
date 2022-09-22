import { Column, JoinColumn, Entity, ManyToOne, PrimaryColumn,  } from "typeorm";
import { User } from "./User";

@Entity('posts')

export class Post {

    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    image: string;

    @Column()
    video: string;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn()
    user: User;

    
}