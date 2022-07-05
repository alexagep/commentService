import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from '../entities/comments.entity';
import { LikesModule } from '../likes/likes.module';
import { PostModule } from '../posts/post.module';

@Module({
  imports: [
    forwardRef(() => LikesModule),
    forwardRef(() => PostModule),
    TypeOrmModule.forFeature([Comments]),
    // PostModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
