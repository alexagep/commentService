import {
  Inject,
  Injectable,
  Logger,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { ReqResponse } from '../schemas/response';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdatePassDto } from '../auth/dto/update-pass.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

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

  async findOneById(id: number): Promise<Users> {
    const user: any = this.request.user;
    if (user.id === id) {
      const user = await this.userRepository.findOne({ where: { id: id } });
      delete user.password;
      return user;
    } else {
      Logger.log(this.request.user);
      throw new UnauthorizedException();
    }
  }

  async createUser(user: Users): Promise<ReqResponse> {
    const newPassword = await this.hashPassword(user.password);
    user.password = newPassword;
    Logger.log('*****************************************');
    await this.userRepository.save(user);
    // delete newUser.password;
    const resp: ReqResponse = {
      status: 201,
      success: true,
      message: 'User created successfully',
      error: false,
    };
    return resp;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<ReqResponse> {
    user.id = id;
    const collectedUser: any = this.request.user;
    if (collectedUser.id === id) {
      const findUser = await this.findById(id);
      if (findUser) {
        user.password = findUser.password;
        await this.userRepository.save(user);
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
    // Logger.log(password);
    const user = await this.findUserByEmail(email);
    Logger.log(password);
    Logger.log(user.password);
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
