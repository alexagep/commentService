// import { Module } from '@nestjs/common';
// import { LikesService } from './likes.service';
// import { LikesController } from './likes.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Likes } from '../entities/likes.entity';
// import { CommentsModule } from '../comments/comments.module';
// import { CommentsService } from '../comments/comments.service';

// @Module({
//   imports: [
//     // forwardRef(() => CommentsModule),
//     CommentsModule,
//     TypeOrmModule.forFeature([Likes]),
//   ],
//   providers: [LikesService, CommentsService],
//   controllers: [LikesController],
//   exports: [LikesService],
// })
// export class LikesModule {}
