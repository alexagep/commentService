import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './access.decorator';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/accessToken.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() id: AuthLoginDto): AccessTokenDto {
    return this.authService.generateToken(id);
  }
}
