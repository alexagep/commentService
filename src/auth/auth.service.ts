import { Inject, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REQUEST)
    private readonly request,
    private jwtService: JwtService,
  ) {}

  async login(data: AuthLoginDto): Promise<any> {
    const payload = { id: data.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
