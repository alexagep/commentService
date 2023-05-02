import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create.comment.dto';
import { CommentsService } from './comments.service';
import { ReqResponse } from '../schemas/response';
import { PagingDto } from './dto/paging.comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    isArray: true,
    description: 'Get Comments of a post',
  })
  @Post(':postId')
  async find(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() data: PagingDto,
  ) {
    return await this.commentsService.findComments(postId, data);
  }

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    type: CreateCommentDto,
    description: 'Create A Comment',
  })
  @Post()
  async create(@Body() Comment: CreateCommentDto): Promise<ReqResponse> {
    const savedComment = await this.commentsService.createComment(Comment);
    return savedComment;
  }

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ description: 'Delete A Comment' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ReqResponse> {
    return await this.commentsService.deleteComment(id);
  }
}
