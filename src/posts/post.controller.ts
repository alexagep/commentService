import {
  Body,
  Controller,
  Delete,
  // Get,
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
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { ReqResponse } from '../schemas/response';
import { UpdatePostDto } from './dto/update-post.dto';
import { PagingDto } from '../comments/dto/paging.comment.dto';
import { resPost } from './dto/response.post.dto';
import { Public } from '../auth/access.decorator';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Public()
  @ApiOkResponse({
    isArray: true,
    description: 'Get Posts',
  })
  @Post()
  async getPosts(@Body() data: PagingDto): Promise<Array<resPost>> {
    return await this.postService.findPosts(data);
  }

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ type: CreatePostDto, description: 'Create A Post' })
  @Post('/create')
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
