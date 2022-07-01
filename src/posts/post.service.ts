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
import { Posts } from '../entities/posts.entity';
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

  async findPosts(id: number) {
    // const post = await this.postRepository.find();
    // const result = await this.postRepository.find({
    //   relations: ['comments', 'users'],
    //   where: { id: id },
    // });
    const result = this.postRepository
      .createQueryBuilder('posts')
      .select([
        'posts.id',
        'posts.content',
        'posts.postedAt',
        'comments.id',
        'comments.content',
        'comments.postedAt',
        'comments.userId',
        'comments.likesCount',
      ])
      // .from(Users, 'users')
      .leftJoin('posts.comments', 'comments')
      .where('posts.id = :id', { id: id })
      // .skip((page - 1) * pageSize).take(pageSize)
      //   .orderBy('posts.postedAt', 'DESC')
      //   .where('users.id = :id', { id: id })
      //   .limit(10)
      .getManyAndCount();

    return result;
  }

  async createPost(post: CreatePostDto): Promise<ReqResponse> {
    // delete post.senderId;
    const user: any = this.request.user;
    // post.senderId = user.id;
    console.log(user);
    

    await this.postRepository
      .createQueryBuilder()
      .insert()
      .into(Posts)
      .values({
        content: post.content,
        senderId: user.id,
      })
      .execute();

    // await this.postRepository.save(post);
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
