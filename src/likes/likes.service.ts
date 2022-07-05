import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
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
import { resComment } from '../comments/dto/response.comment.dto';

@Injectable()
export class LikesService {
  constructor(
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

  async findLikesByCommentId(commentId: number): Promise<Likes[]> {
    const like = await this.likeRepository.find({
      where: { commentId },
    });
    return like;
  }

  async likeComment(data: CreateLikeDto): Promise<ReqResponse> {
    const comment = await this.commentsService.findComment(data.commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    if (data.like == data.dislike) {
      throw new BadRequestException('Like and Dislike cannot be same');
    }
    const user: any = this.request.user;
    const likeHistory = await this.findLikes(data.commentId, user.id);

    if (likeHistory.length == 0) {
      const likeHistoryCollect = [];
      let hasLiked = false;
      let hasDisliked = false;

      if (data.like) {
        hasLiked = true;
        await this.updateLikeCount(data.commentId, CommentStatus.LIKE);
      } else if (data.dislike) {
        await this.updateLikeCount(data.commentId, CommentStatus.DISLIKE);
        hasDisliked = true;
      }

      likeHistoryCollect.push({
        hasLiked: hasLiked,
        hasDisliked: hasDisliked,
        senderId: user.id,
        commentId: data.commentId,
      });
      return await this.saveLikeRepo(likeHistoryCollect[0]);
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

  async recognizeCommentIsLiked(senderId: number, comments: Array<resComment>) {
    const collect = [];

    for (const comment of comments) {
      const result = await this.likeRepository.find({
        where: { senderId, commentId: comment.id, hasLiked: true },
      });
      if (result[0]) {
        collect.push({
          ...comment,
          hasLikedByUser: true,
        });
      } else {
        collect.push({
          ...comment,
          hasLikedByUser: false,
        });
      }
    }
    return collect;
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
