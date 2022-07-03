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
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create.comment.dto';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReqResponse } from '../schemas/response';
import { CommentStatus } from './dto/update.comment.dto';
import { PagingDto } from './dto/paging.comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    isArray: false,
    description: 'Get An Comment',
  })
  @Post(':id')
  async find(
    @Param('id', ParseIntPipe) postId: number,
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
  
  //update likesCount or dislikesCount of  a comment
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ description: 'Update A Comment' })
  @Put(':id')
  async update(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() data: CommentStatus,
  ): Promise<ReqResponse> {
    return await this.commentsService.updateComment(commentId, data);
  }
}
