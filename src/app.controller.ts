import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiCreatedResponse({ description: 'Root Path' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
