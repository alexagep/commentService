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
import { Posts } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Request } from 'express';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable({ scope: Scope.REQUEST })
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async findPosts(): Promise<Posts[]> {
    const post = await this.postRepository.find();
    return post;
  }

  async createPost(post: CreatePostDto): Promise<ReqResponse> {
    delete post.senderId;
    post.senderId = this.request.user.id;
    await this.postRepository.save(post);
    const resp: ReqResponse = {
      status: 201,
      success: true,
      message: 'Post created successfully',
      error: false,
    };
    return resp;
  }

  async updatePost(id: number, user: UpdatePostDto): Promise<ReqResponse> {
    const valid = await this.validateUser(id);
    if (valid) {
      await this.postRepository.save(user);

      const resp: ReqResponse = {
        status: 200,
        success: true,
        message: 'Post updated successfully',
        error: false,
      };
      return resp;
    } else {
      throw new UnauthorizedException();
    }
  }

  async deletePost(id: number): Promise<ReqResponse> {
    const valid = await this.validateUser(id);
    if (valid) {
      await this.postRepository.delete(id);
      const resp: ReqResponse = {
        status: 200,
        success: true,
        message: 'Post deleted successfully',
        error: false,
      };
      return resp;
    } else {
      throw new UnauthorizedException();
    }
  }

  async validateUser(id: number): Promise<any> {
    const user: any = this.request.user;
    if (user.id === id) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
