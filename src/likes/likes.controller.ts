// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseIntPipe,
//   UseGuards,
// } from '@nestjs/common';

// import {
//   ApiBearerAuth,
//   ApiCreatedResponse,
//   ApiOkResponse,
// } from '@nestjs/swagger';
// import { CreateLikeDto } from './dto/create.like.dto';
// import { LikesService } from './likes.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { Likes } from '../entities/likes.entity';
// import { ReqResponse } from '../schemas/response';

// @UseGuards(JwtAuthGuard)
// @Controller('likes')
// export class LikesController {
//   constructor(private readonly likeService: LikesService) {}

//   // @ApiBearerAuth('access-token')
//   // @ApiOkResponse({
//   //   isArray: false,
//   //   description: 'Get An Like',
//   // })
//   // @Get(':id')
//   // async find(@Param('id', ParseIntPipe) postId: number): Promise<Likes[]> {
//   //   return await this.likeService.findLikes(postId);
//   // }

//   @ApiBearerAuth('access-token')
//   @ApiCreatedResponse({
//     type: CreateLikeDto,
//     description: 'Create A Like',
//   })
//   async create(@Body() Like: CreateLikeDto): Promise<ReqResponse> {
//     const savedLike = await this.likeService.createLike(Like);
//     return savedLike;
//   }

//   @ApiBearerAuth('access-token')
//   @ApiCreatedResponse({ description: 'Delete A Like' })
//   @Delete(':id')
//   async delete(@Param('id', ParseIntPipe) id: number): Promise<ReqResponse> {
//     return await this.likeService.deleteLike(id);
//   }
// }
