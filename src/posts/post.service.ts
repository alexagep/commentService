import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ReqResponse } from '../schemas/response';
import { Repository } from 'typeorm';
import { Posts } from '../entities/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Request } from 'express';
import { UpdatePostDto } from './dto/update-post.dto';
import { PagingDto } from '../comments/dto/paging.comment.dto';

/* the scope property is set to Scope.REQUEST, which means that a new instance of 
this service will be created for each incoming request to ensure that each request has 
its own isolated instance of the service. */
@Injectable({ scope: Scope.REQUEST })
export class PostService {
  constructor(
    /* The @InjectRepository(Posts) decorator is used to inject a Repository instance 
    for the Posts entity provided by TypeORM. This repository instance can then be used 
    to perform database operations for the Posts entity. */
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    /* The @Inject(REQUEST) decorator in NestJS is used to inject the Request 
    object into a class constructor or a method */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async findPosts(data: PagingDto) {
    const pageIndex = data.pageIndex;
    const pageSize = data.pageSize;
    const limit = data.limit;

    const result = this.postRepository
      //Creates a new query builder that can be used to build a SQL query.
      .createQueryBuilder('posts')
      .select(['posts.id', 'posts.senderId', 'posts.content', 'posts.postedAt'])
      .skip((pageIndex - 1) * pageSize)
      .take(10)
      .orderBy('posts.postedAt', 'DESC')
      .limit(limit)
      .getMany();

    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  async createPost(post: CreatePostDto): Promise<ReqResponse> {
    const user: any = this.request.user;

    await this.postRepository
      .createQueryBuilder()
      .insert()
      .into(Posts)
      .values({
        content: post.content,
        senderId: user.id,
      })
      .execute();

    const resp: ReqResponse = {
      status: 201,
      success: true,
      message: 'Post created successfully',
      error: false,
    };
    return resp;
  }

  async updatePost(id: number, postData: UpdatePostDto): Promise<ReqResponse> {
    const validPost = await this.findPostByIdAndSenderId(id);

    if (validPost) {
      await this.postRepository
        .createQueryBuilder()
        .update(Posts)
        .set({
          content: postData.content,
          senderId: validPost.senderId,
        })
        .where('id = :id', { id })
        .execute();

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
    const post = await this.findPostById(id);
    if (post) {
      const valid = await this.validateUser(post.senderId);
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
    } else {
      throw new HttpException(
        'Something Went wrong, Select Comment Again',
        422,
      );
    }
  }

  async findPostByIdAndSenderId(id: number): Promise<Posts> {
    const user: any = this.request.user;
    const userId = user.id;

    console.log(userId, id);

    return await this.postRepository.findOne({
      where: { id, senderId: userId },
    });
  }

  async findPostById(id: number): Promise<Posts> {
    return await this.postRepository.findOne({
      where: { id },
    });
  }

  async validateUser(senderId: number): Promise<boolean> {
    const user: any = this.request.user;
    const userId = user.id;

    if (userId === senderId) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
