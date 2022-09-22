import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/Post"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "blog-app-ts",
    synchronize: true,
    logging: false,
    entities: [User, Post],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}'],
})
