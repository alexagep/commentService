import {
  Inject,
  Injectable,
  Logger,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { ReqResponse } from '../schemas/response';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdatePassDto } from '../auth/dto/update-pass.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
// import { Posts } from 'src/entities/posts.entity';
import { Posts } from '../entities/posts.entity';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number) {
    const user: any = this.request.user;
    if (user.id === id) {
      // const result = await this.userRepository
      //   .createQueryBuilder()
      //   .leftJoinAndSelect(Users, 'posts')
      //   .where('users.id = :id', { id: id });

      // const result = await this.userRepository
      //   .createQueryBuilder()
      //   .select('users')
      //   .from(Users, 'users')
      //   .leftJoinAndMapOne(
      //     'users.id',
      //     Posts,
      //     'posts',
      //     'posts.userId = users.id',
      //   )
      //   .orderBy('posts.postedAt', 'DESC')
      //   .where('users.id = :id', { id: id })
      //   .limit(10)
      //   .getMany();

      const result = await this.userRepository.find({
        relations: ['posts'],
        where: { id: id },
      });

      // const user = await this.userRepository.findOne({ where: { id: id } });
      // delete result[0].password;
      return result;
    } else {
      Logger.log(this.request.user);
      throw new UnauthorizedException();
    }
  }

  async createUser(user: CreateUserDto): Promise<ReqResponse> {
    const newPassword = await this.hashPassword(user.password);
    user.password = newPassword;
    Logger.log('*****************************************');
    await this.userRepository.save(user);
    const resp: ReqResponse = {
      status: 201,
      success: true,
      message: 'User created successfully',
      error: false,
    };
    return resp;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<ReqResponse> {
    const collectedUser: any = this.request.user;
    if (collectedUser.id === id) {
      const findUser = await this.findById(id);
      if (findUser) {
        user.password = findUser.password;
        await this.userRepository
          .createQueryBuilder()
          .update(Users)
          .set({
            name: user.name,
            email: user.email,
            password: findUser.password,
          })
          .where('id = :id', { id: id })
          .execute();
      }

      const resp: ReqResponse = {
        status: 200,
        success: true,
        message: 'User updated successfully',
        error: false,
      };
      return resp;
    } else {
      throw new UnauthorizedException();
    }
  }

  async deleteUser(id: number): Promise<ReqResponse> {
    const user: any = this.request.user;
    if (user.id === id) {
      await this.userRepository.delete(id);
      const resp: ReqResponse = {
        status: 200,
        success: true,
        message: 'User deleted successfully',
        error: false,
      };
      return resp;
    } else {
      throw new UnauthorizedException();
    }
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async validateUser(name: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { name: name } });
  }

  private async hashPassword(password: string) {
    try {
      password = await bcrypt.hash(password, 8);
      return password;
    } catch (e) {
      throw new Error('There are some wrong in the hash');
    }
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      return valid;
    }
  }

  private async findById(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async updatePassword(id: number, data: UpdatePassDto): Promise<Users> {
    const user = await this.findById(id);
    if (user) {
      user.password = await this.hashPassword(data.password);
      return await this.userRepository.save(user);
    }
  }
}
