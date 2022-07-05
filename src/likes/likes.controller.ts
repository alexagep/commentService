import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateLikeDto } from './dto/create.like.dto';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReqResponse } from '../schemas/response';

@ApiTags('Likes')
@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    type: CreateLikeDto,
    description: 'Like A Comment',
  })
  @Post()
  async create(@Body() Like: CreateLikeDto): Promise<ReqResponse> {
    const savedLike = await this.likeService.likeComment(Like);
    return savedLike;
  }
}
