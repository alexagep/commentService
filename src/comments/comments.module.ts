import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from '../entities/comments.entity';
import { LikesModule } from '../likes/likes.module';
// import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), LikesModule],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
