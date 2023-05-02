import { registerAs } from "@nestjs/config";
import { Comments } from "../entities/comments.entity";
import { Likes } from "../entities/likes.entity";
import { Posts } from "../entities/posts.entity";
import { DataSourceOptions } from 'typeorm';

const CONNECTION_TYPE = 'postgres';

/* The registerAs function is used to register this configuration file behind a specified token, 
which can then be used to load the configuration options in the TypeORM module using ConfigService. */
export default registerAs(
  'typeorm',
  (): DataSourceOptions => ({
    type: CONNECTION_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Posts, Comments, Likes],
  }),
); 