import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Posts } from '../entities/post.entity';
import { ReqResponse } from '../schemas/response';
import { UpdatePostDto } from './dto/update-post.dto';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}


  // @ApiOkResponse({
  //   type: CreatePostDto,
  //   isArray: true,
  //   description: 'Get All Users',
  // })
  // @Get()
  // async getUsers(): Promise<Posts[]> {
  //   return await this.postService.findAll();
  // }

  @ApiOkResponse({
    isArray: false,
    description: 'Get An User',
  })
  @Get(':id')
  async getPosts(): Promise<Posts[]> {
    return await this.postService.findPosts();
  }

  @ApiCreatedResponse({ type: CreatePostDto, description: 'Create A Post' })
  @Post()
  async create(@Body() post: CreatePostDto): Promise<ReqResponse> {
    const savedPost = await this.postService.createPost(post);
    return savedPost;
  }

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ type: UpdatePostDto, description: 'Update A Post' })
  @ApiNotFoundResponse()
  @Put(':id')
  async update(
    @Body() post: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReqResponse> {
    return await this.postService.updatePost(id, post);
  }

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ description: 'Delete A Post' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ReqResponse> {
    return await this.postService.deletePost(id);
  }
}
