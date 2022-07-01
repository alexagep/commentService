import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { PostModule } from './posts/post.module';
import { Posts } from './entities/posts.entity';
import { CommentsModule } from './comments/comments.module';
// import { LikesModule } from './likes/likes.module';
// import { Likes } from './entities/likes.entity';
import { Comments } from './entities/comments.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Users, Posts, Comments],
      // entities: [Users, Posts, Likes, Comments],

      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PostModule,
    CommentsModule,
    // LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
