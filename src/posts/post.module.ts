import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatePostMiddleware } from '../middleware/createPost.middleware';
import { Posts } from '../entities/posts.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuditMiddleware } from '../middleware/audit.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes({
      path: '/posts',
      method: RequestMethod.POST,
    });
    consumer
      .apply(CreatePostMiddleware)
      .forRoutes({ path: '/posts/create', method: RequestMethod.POST });
  }
}
