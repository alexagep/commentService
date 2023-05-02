import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './access.decorator';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/accessToken.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@ApiTags('Auth') // Add OpenAPI tag for API documentation
@Controller('auth') // Define controller's base route
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // Set custom metadata to allow public access
  @Post('login') // Define endpoint route and method
  login(@Body() id: AuthLoginDto): AccessTokenDto { // Define endpoint handler and request payload
    return this.authService.generateToken(id); // Call the injected service to generate an access token
  }
}
