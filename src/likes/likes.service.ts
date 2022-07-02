import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqResponse } from '../schemas/response';
import { Repository, createQueryBuilder } from 'typeorm';
import { Likes } from '../entities/likes.entity';
import { CreateLikeDto } from './dto/create.like.dto';
import { Request } from 'express';
import { CommentsService } from '../comments/comments.service';
import { CommentStatus } from '../comments/dto/update.comment.dto';

@Injectable()
export class LikesService {
  constructor(
    // private readonly commentsService: CommentsService,
    @Inject(forwardRef(() => CommentsService))
    private commentsService: CommentsService,
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
    const likeHistory = await this.findLikes(data.commentId, user.id);

    if (likeHistory.length == 0) {
      const likedHistory = [];
      let hasLiked = false;
      let hasDisliked = false;

      if (data.like) {
        hasLiked = true;
        await this.updateLikeCount(data.commentId, CommentStatus.LIKE);
      } else if (data.dislike) {
        await this.updateLikeCount(data.commentId, CommentStatus.DISLIKE);
        hasDisliked = true;
      }

      likedHistory.push({
        hasLiked: hasLiked,
        hasDisliked: hasDisliked,
        senderId: user.id,
        commentId: data.commentId,
      });
      return await this.saveLikeRepo(likedHistory[0]);
    } else {
      if (
        (likeHistory.length > 0 && likeHistory[0].hasLiked === data.like) ||
        (likeHistory.length > 0 && likeHistory[0].hasDisliked === data.dislike)
      ) {
        return {
          status: 400,
          success: false,
          message: 'You have already voted this comment',
          error: true,
        };
      } else if (
        likeHistory.length > 0 &&
        likeHistory[0].hasDisliked &&
        data.like
      ) {
        await this.updateLikeCount(data.commentId, CommentStatus.SWITCH_LIKE);

        likeHistory[0].hasDisliked = false;
        likeHistory[0].hasLiked = true;
        return await this.updateLikeRepo(likeHistory[0]);
      } else if (
        likeHistory.length > 0 &&
        likeHistory[0].hasLiked &&
        data.dislike
      ) {
        await this.updateLikeCount(
          data.commentId,
          CommentStatus.SWITCH_DISLIKE,
        );

        likeHistory[0].hasDisliked = true;
        likeHistory[0].hasLiked = false;
        return await this.updateLikeRepo(likeHistory[0]);
      }
    }
  }

  async updateLikeRepo(data) {
    await this.likeRepository
      .createQueryBuilder()
      .update(Likes)
      .set({
        hasDisliked: data.hasDisliked,
        hasLiked: data.hasLiked,
        commentId: data.commentId,
        senderId: data.senderId,
      })
      .where('id = :id', { id: data.id })
      .execute();

    return {
      status: 200,
      success: true,
      message: 'You have voted this comment successfully',
      error: false,
    };
  }

  async saveLikeRepo(data: any) {
    await this.likeRepository.save({
      senderId: data.senderId,
      commentId: data.commentId,
      hasDisliked: data.hasDisliked,
      hasLiked: data.hasLiked,
    });

    return {
      status: 200,
      success: true,
      message: 'You have voted this comment successfully',
      error: false,
    };
  }

  async updateLikeCount(
    commentId: number,
    likeState: CommentStatus,
  ): Promise<void> {
    if (likeState === 'like') {
      await this.commentsService.updateComment(commentId, CommentStatus.LIKE);
    } else if (likeState === 'dislike') {
      await this.commentsService.updateComment(
        commentId,
        CommentStatus.DISLIKE,
      );
    } else if (likeState === 'switchLike') {
      await this.commentsService.updateComment(
        commentId,
        CommentStatus.SWITCH_LIKE,
      );
    } else if (likeState === 'switchDislike') {
      await this.commentsService.updateComment(
        commentId,
        CommentStatus.SWITCH_DISLIKE,
      );
    }
  }

  async deleteLike(commentId: number): Promise<ReqResponse> {
    const likeData = await this.likeRepository.find({
      where: { commentId },
    });
    if (likeData[0]) {
      const valid = await this.validateUser(likeData[0].senderId);
      if (valid) {
        await this.likeRepository.delete(commentId);

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
  }

  async recognizeCommentIsLiked(senderId: number, commentId: number) {
    const result = await this.likeRepository.find({
      where: { senderId, commentId, hasLiked: true },
    });
    if (result.length == 0) {
      return false;
    }
    return true;
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
