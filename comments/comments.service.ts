import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqResponse } from '../schemas/response';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comments.entity';
import { CreateCommentDto } from './dto/create.comment.dto';
import { Request } from 'express';
import { CommentStatus } from './dto/update.comment.dto';

@Injectable({ scope: Scope.REQUEST })
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  //find comments by post id
  async findComments(id: number): Promise<Comment[]> {
    const comment = await this.commentRepository.find({
      where: {
        postId: id,
      },
    });
    return comment;
  }

  //find comment by id
  async findComment(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id: id } });
    return comment;
  }

  async createComment(comment: CreateCommentDto): Promise<ReqResponse> {
    delete comment.userId;
    comment.userId = this.request.user.id;
    await this.commentRepository.save(comment);
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
    if (foundComment && data === 'increase') {
      foundComment.likesCount += 1;
    } else if (foundComment && data === 'decrease') {
      foundComment.likesCount -= 1;
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
