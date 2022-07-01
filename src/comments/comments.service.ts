import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleRef, REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqResponse } from '../schemas/response';
import { Repository } from 'typeorm';
import { Comments } from '../entities/comments.entity';
import { CreateCommentDto } from './dto/create.comment.dto';
import { Request } from 'express';
import { CommentStatus } from './dto/update.comment.dto';
import { LikesService } from '../likes/likes.service';

@Injectable()
export class CommentsService {
  constructor(
    // private readonly moduleRef: ModuleRef,
    @Inject(forwardRef(() => LikesService))
    private likeService: LikesService,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  // onModuleInit() {
  //   this.likeService = this.moduleRef.get(LikesService);
  // }

  // find comments by post id
  async findComments(id: number) {
    const pageIndex = 1;
    const pageSize = 10;
    const limit = 10;

    const result = this.commentRepository
      .createQueryBuilder('comments')
      .select([
        'comments.id',
        'comments.content',
        'comments.postedAt',
        'comments.senderId',
        'comments.likesCount',
      ])
      .leftJoin('comments.post', 'posts')
      .where('posts.id = :id', { id: id })
      // .innerJoin()
      .skip((pageIndex - 1) * pageSize)
      .take(10)
      .orderBy('comments.postedAt', 'DESC')
      .limit(limit)
      .getManyAndCount();

    const likeHistory = await this.commentIsLikedByUser(result[0].commentId);
    if (likeHistory == true) {
      result[0].likedByUser = true;
    }
    return result;
  }

  async commentIsLikedByUser(commentId: number) {
    const user: any = this.request.user;
    const userId = user.id;
    return this.likeService.recognizeCommentIsLiked(userId, commentId);
  }

  //find comment by id
  async findComment(id: number): Promise<Comments> {
    const comment = await this.commentRepository.findOne({ where: { id: id } });
    return comment;
  }

  async createComment(comment: CreateCommentDto): Promise<ReqResponse> {
    const user: any = this.request.user;

    await this.commentRepository
      .createQueryBuilder()
      .insert()
      .into(Comments)
      .values({
        content: comment.content,
        senderId: user.id,
        post: () => comment.postId.toString(),
      })
      .execute();

    const resp: ReqResponse = {
      status: 201,
      success: true,
      message: 'Comment created successfully',
      error: false,
    };
    return resp;
  }

  async deleteComment(id: number): Promise<ReqResponse> {
    const valid = await this.validateUser(id);
    if (valid) {
      await this.commentRepository.delete(id);

      await this.likeService.deleteLike(id);

      const resp: ReqResponse = {
        status: 200,
        success: true,
        message: 'Comment deleted successfully',
        error: false,
      };
      return resp;
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateComment(id: number, data: CommentStatus): Promise<ReqResponse> {
    const foundComment = await this.findComment(id);
    if (foundComment && data === 'like') {
      foundComment.likesCount += 1;
    } else if (foundComment && data === 'dislike') {
      foundComment.likesCount -= 1;
    } else if (foundComment && data === 'switchLike') {
      foundComment.likesCount += 2;
    } else if (foundComment && data === 'switchDislike') {
      foundComment.likesCount -= 2;
    } else {
      throw new NotFoundException('Comment not found');
    }

    await this.commentRepository.save(foundComment);
    const resp: ReqResponse = {
      status: 200,
      success: true,
      message: 'Comment updated successfully',
      error: false,
    };
    return resp;
  }

  async validateUser(id: number): Promise<boolean> {
    const collectedUser: any = this.request.user;
    if (collectedUser.id === id) {
      return true;
    } else {
      return false;
    }
  }
}
