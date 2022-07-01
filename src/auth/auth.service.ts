import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Users } from '../entities/users.entity';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UpdatePassDto } from './dto/update-pass.dto';
import { ReqResponse } from '../schemas/response';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @Inject(REQUEST)
    private readonly request,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const { email, password } = authLoginDto;
    Logger.log(
      '**************',
      authLoginDto.email,
      '*************',
      authLoginDto.password,
    );
    const user = await this.usersService.validatePassword(email, password);

    if (user) {
      const collectUser = await this.usersService.findUserByEmail(email);
      const payload = {
        // email,
        // password,
        id: collectUser.id,
      };
      Logger.log('payload_****************', payload);

      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async updatePassword(id: number, data: UpdatePassDto): Promise<Users> {
    const user = this.request.user;
    if (user.id === id && data.password === data.rePassword) {
      return await this.usersService.updatePassword(id, data);
    } else {
      Logger.error(user);
      throw new UnauthorizedException();
    }
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<Users> {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findUserByEmail(email);

    if (user && user.password === password) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async login___(authLoginDto: AuthLoginDto): Promise<any> {
    const { email, password } = authLoginDto;
    const collectUser = await this.usersService.findUserByEmail(email);
    const payload = { email, password, id: collectUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(user: AuthRegisterDto): Promise<ReqResponse> {
    return await this.usersService.createUser(user);
    // const newPassword = await this.hashPassword(user.password);
    // user.password = newPassword;
    // Logger.log('*****************************************');
    // await this.userRepository.save(user);
    // const resp: ReqResponse = {
    //   status: 201,
    //   success: true,
    //   message: 'User created successfully',
    //   error: false,
    // };
    // return resp;
  }
}
