import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqResponse } from '../schemas/response';
import { Repository } from 'typeorm';
import { Comments } from '../entities/comments.entity';
import { CreateCommentDto } from './dto/create.comment.dto';
import { Request } from 'express';
import { CommentStatus } from './dto/update.comment.dto';
import { LikesService } from '../likes/likes.service';
import { PagingDto } from './dto/paging.comment.dto';
import { PostService } from '../posts/post.service';
import { resComment, resFindComment } from './dto/response.comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private postService: PostService,
    @Inject(forwardRef(() => LikesService))
    private likeService: LikesService,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  // find comments by post id
  async findComments(
    postId: number,
    data: PagingDto,
  ): Promise<Array<resFindComment>> {
    const pageIndex = data.pageIndex;
    const pageSize = data.pageSize;
    const limit = data.limit;
    const user: any = this.request.user;
    const userId: number = user.id;

    const post = await this.postService.findPostById(postId);
    if (post) {
      const result = await this.commentRepository
        .createQueryBuilder('comments')
        .select([
          'comments.id',
          'comments.content',
          'comments.postedAt',
          'comments.senderId',
          'comments.likesCount',
        ])
        .where('comments.postId = :postId', { postId })
        .skip((pageIndex - 1) * pageSize)
        .take(10)
        .orderBy('comments.postedAt', 'DESC')
        .limit(limit)
        .getMany();

      if (result.length > 0) {
        return await this.commentIsLikedByUser(result, userId);
      } else {
        throw new NotFoundException('this post has no post yet');
      }
    } else {
      throw new NotFoundException('post not found');
    }
  }

  async commentIsLikedByUser(comments: Array<resComment>, userId: number) {
    return this.likeService.recognizeCommentIsLiked(userId, comments);
  }

  //find comment by id
  async findComment(id: number): Promise<Comments> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    return comment;
  }

  async deleteCommentByPostId(postId: number): Promise<ReqResponse> {
    const comment = await this.commentRepository.findOne({ where: { postId } });
    if (comment) {
      return await this.deleteOperation(comment.id);
    }
  }

  async createComment(comment: CreateCommentDto): Promise<ReqResponse> {
    const user: any = this.request.user;

    const post = await this.postService.findPostById(comment.postId);
    if (post) {
      await this.commentRepository
        .createQueryBuilder()
        .insert()
        .into(Comments)
        .values({
          content: comment.content,
          senderId: user.id,
          postId: comment.postId,
        })
        .execute();

      const resp: ReqResponse = {
        status: 201,
        success: true,
        message: 'Comment created successfully',
        error: false,
      };
      return resp;
    } else {
      throw new NotFoundException('post not found');
    }
  }

  async deleteComment(id: number): Promise<ReqResponse> {
    const comment = await this.findComment(id);
    if (comment) {
      const valid = await this.validateUser(comment.senderId);
      if (valid) {
        return await this.deleteOperation(id);
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new HttpException(
        'Something Went wrong, Select Comment Again',
        422,
      );
    }
  }

  async deleteOperation(id: number): Promise<ReqResponse> {
    await this.commentRepository.delete(id);

    await this.likeService.deleteLike(id);

    const resp: ReqResponse = {
      status: 200,
      success: true,
      message: 'Comment deleted successfully',
      error: false,
    };
    return resp;
  }

  async updateComment(id: number, data: CommentStatus): Promise<ReqResponse> {
    const foundComment = await this.findComment(id);

    if (foundComment && data == 'like') {
      foundComment.likesCount += 1;
    } else if (foundComment && data == 'dislike') {
      foundComment.likesCount -= 1;
    } else if (foundComment && data == 'switchLike') {
      foundComment.likesCount += 2;
    } else if (foundComment && data == 'switchDislike') {
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

  async validateUser(senderId: number): Promise<boolean> {
    const user: any = this.request.user;
    const userId = user.id;

    console.log(userId, senderId);

    if (userId === senderId) {
      return true;
    } else {
      return false;
    }
  }
}
