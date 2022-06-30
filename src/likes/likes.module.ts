import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../entities/likes.entity';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), CommentsService],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
