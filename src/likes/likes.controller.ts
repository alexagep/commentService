import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateLikeDto } from './dto/create.like.dto';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReqResponse } from '../schemas/response';

@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    type: CreateLikeDto,
    description: 'Create A Like',
  })
  @Post()
  async create(@Body() Like: CreateLikeDto): Promise<ReqResponse> {
    const savedLike = await this.likeService.createLike(Like);
    return savedLike;
  }

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ description: 'Delete A Like' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ReqResponse> {
    return await this.likeService.deleteLike(id);
  }
}
