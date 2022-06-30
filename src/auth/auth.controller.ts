import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @ApiBearerAuth('access-token') //edit here
  @ApiOkResponse({
    type: UpdatePassDto,
    isArray: true,
    description: 'Update Password',
  })
  @UseGuards(JwtAuthGuard)
  @Put('updatePass/:id')
  async updatePassword(
    @Body() data: UpdatePassDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.authService.updatePassword(id, data);
  }

  @ApiOkResponse({
    type: AuthLoginDto,
    isArray: true,
    description: 'Login',
  })
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.login(authLoginDto);
  }

  @Post('register')
  async register(@Body() authLoginDto: AuthLoginDto) {
    return await this.authService.login___(authLoginDto);
  }


  @Post('logout')
  logout() {
    return {
      message: 'Logout successfully',
    };
  }
}
