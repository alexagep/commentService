import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqResponse } from '../schemas/response';
import { Repository } from 'typeorm';
import { Like } from '../entities/likes.entity';
import { CreateLikeDto } from './dto/create.like.dto';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async findLikes(commentId: number, userId: number): Promise<Like[]> {
    const like = await this.likeRepository.find({
      where: {
        commentId,
        userId,
      },
    });
    return like;
  }

  async createLike(like: CreateLikeDto): Promise<ReqResponse> {
    const userId = this.request.user.id;
    const likeHistory = await this.findLikes(like.commentId, userId);
    if (likeHistory.length > 0 && likeHistory[0].like === like.like) {}
    delete like.userId;
    like.userId = userId;
    await this.likeRepository.save(like);
    const resp: ReqResponse = {
      status: 201,
      success: true,
      message: 'Like created successfully',
      error: false,
    };
    return resp;
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
    const like = await this.likeRepository.findOne(id);
    if (like.userId === this.request.user.id) {
      return true;
    } else {
      return false;
    }
  }
}
