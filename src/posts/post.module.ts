import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from '../comments/comments.module';
import { Posts } from '../entities/posts.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    forwardRef(() => CommentsModule),
    TypeOrmModule.forFeature([Posts]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
