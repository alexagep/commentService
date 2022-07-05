import {
  Module,
  forwardRef,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from '../entities/comments.entity';
import { LikesModule } from '../likes/likes.module';
import { PostModule } from '../posts/post.module';
import { CreateCommentMiddleware } from '../middleware/createComment.middleware';

@Module({
  imports: [
    forwardRef(() => LikesModule),
    TypeOrmModule.forFeature([Comments]),
    PostModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateCommentMiddleware).forRoutes({
      path: '/comments',
      method: RequestMethod.POST,
    });
  }
}
