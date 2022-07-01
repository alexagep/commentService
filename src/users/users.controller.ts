// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseIntPipe,
//   // Post,
//   Put,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UsersService } from './users.service';
// import { Users } from '../entities/users.entity';
// import { ReqResponse } from '../schemas/response';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import {
//   ApiBearerAuth,
//   ApiCreatedResponse,
//   ApiNotFoundResponse,
//   ApiOkResponse,
//   ApiTags,
// } from '@nestjs/swagger';
// import { BenchmarkInterceptor } from '../interceptors/benchmark.interceptor';

// @ApiTags('users')
// @Controller('users')
// @UseGuards(JwtAuthGuard)
// @UseInterceptors(BenchmarkInterceptor)
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @ApiOkResponse({
//     type: CreateUserDto,
//     isArray: true,
//     description: 'Get All Users',
//   })
//   @Get()
//   async getUsers(): Promise<Users[]> {
//     return await this.usersService.findAll();
//   }

//   @ApiBearerAuth('access-token')
//   @ApiOkResponse({
//     type: CreateUserDto,
//     isArray: false,
//     description: 'Get An User',
//   })
//   @Get(':id')
//   async getUserById(@Param('id', ParseIntPipe) id: number) {
//     return await this.usersService.findOneById(id);
//   }

//   @ApiBearerAuth('access-token')
//   @ApiCreatedResponse({ type: CreateUserDto, description: 'Update An User' })
//   @ApiNotFoundResponse()
//   @Put(':id')
//   async updateUser(
//     @Body() user: UpdateUserDto,
//     @Param('id', ParseIntPipe) id: number,
//   ): Promise<ReqResponse> {
//     return await this.usersService.updateUser(id, user);
//   }

//   @ApiBearerAuth('access-token')
//   @ApiCreatedResponse({ type: CreateUserDto, description: 'Delete An User' })
//   @Delete(':id')
//   async deleteUser(
//     @Param('id', ParseIntPipe) id: number,
//   ): Promise<ReqResponse> {
//     return await this.usersService.deleteUser(id);
//   }
// }
