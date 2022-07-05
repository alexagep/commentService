import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/accessToken.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(data: AuthLoginDto): AccessTokenDto {
    const payload = { id: data.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
