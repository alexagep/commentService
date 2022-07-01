import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqResponse } from '../schemas/response';
import { Repository } from 'typeorm';
import { Likes } from '../entities/likes.entity';
import { CreateLikeDto } from './dto/create.like.dto';
import { Request } from 'express';
import { CommentsService } from '../comments/comments.service';
import { CommentStatus } from '../comments/dto/update.comment.dto';
import { Comments } from '../entities/comments.entity';

@Injectable()
export class LikesService {
  constructor(
    // @Inject(forwardRef(() => CommentsService))

    // (forwardRef(() => CommentsService)),

    private readonly commentsService: CommentsService,
    @InjectRepository(Likes)
    private readonly likeRepository: Repository<Likes>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async findLikes(commentId: number, userId: number): Promise<Likes[]> {
    const like = await this.likeRepository.find({
      where: { commentId, senderId: userId },
    });
    return like;
  }

  async createLike(data: CreateLikeDto): Promise<ReqResponse> {
    if (data.like == data.dislike) {
      throw new BadRequestException('Like and Dislike cannot be same');
    }
    const user: any = this.request.user;
    // console.log(user, data.commentId, '**********************');

    const likeHistory = await this.findLikes(data.commentId, user.id);
    if (likeHistory.length == 0) {
      await this.likeRepository.save({
        senderId: user.id,
        commentId: data.commentId,
        hasLiked: data.like,
        hasDisliked: data.dislike,
      });
      if (data.like) {
        this.like(data.commentId);
      } else if (data.dislike) {
        this.dislike(data.commentId);
      }
      return {
        status: 200,
        success: true,
        message: 'You have voted this comment successfully',
        error: false,
      };
    } else {
      if (likeHistory.length > 0 && likeHistory[0].hasLiked === data.like) {
        this.dislike(data.commentId);

        await this.deleteLike(likeHistory[0].id);
        return {
          status: 200,
          success: true,
          message: 'You have rolebacked your previous vote',
          error: false,
        };
      } else if (
        likeHistory.length > 0 &&
        likeHistory[0].hasDisliked === data.dislike
      ) {
        this.like(data.commentId);

        await this.deleteLike(likeHistory[0].id);
        return {
          status: 200,
          success: true,
          message: 'You have rolebacked your previous vote',
          error: false,
        };
      } else if (
        likeHistory.length > 0 &&
        likeHistory[0].hasDisliked &&
        data.like
      ) {
        this.like(data.commentId);
        this.like(data.commentId);

        await this.likeRepository.save({
          senderId: user.id,
          commentId: data.commentId,
          hasDisliked: false,
          hasLiked: true,
        });
        return {
          status: 200,
          success: true,
          message: 'You have voted this comment successfully',
          error: false,
        };
      } else if (
        likeHistory.length > 0 &&
        likeHistory[0].hasLiked &&
        data.dislike
      ) {
        this.dislike(data.commentId);
        this.dislike(data.commentId);

        await this.likeRepository.save({
          senderId: user.id,
          commentId: data.commentId,
          hhasDisliked: true,
          hasLiked: false,
        });
        return {
          status: 200,
          success: true,
          message: 'You have voted this comment successfully',
          error: false,
        };
      }
    }
  }

  async like(commentId: number) {
    await this.commentsService.updateComment(commentId, CommentStatus.LIKE);
  }

  async dislike(commentId: number) {
    await this.commentsService.updateComment(commentId, CommentStatus.DISLIKE);
  }

  async deleteLike(id: number): Promise<ReqResponse> {
    const valid = await this.validateUser(id);
    if (valid) {
      await this.likeRepository.delete(id);

      const resp: ReqResponse = {
        status: 200,
        success: true,
        message: 'Like deleted successfully',
        error: false,
      };
      return resp;
    } else {
      throw new UnauthorizedException();
    }
  }

  async validateUser(id: number): Promise<boolean> {
    const like = await this.likeRepository.findOne({ where: { id: id } });
    const user: any = this.request.user;

    if (like.senderId === user.id) {
      return true;
    } else {
      return false;
    }
  }
}
