import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { AuditMiddleware } from '../middleware/audit.middleware';
import { CreateMiddleware } from '../middleware/create.middleware';

@Module({
  //This module uses the forFeature() method to define which repositories are registered in the current scope
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes({
      path: '/users',
      method: RequestMethod.GET,
    });
    consumer
      .apply(CreateMiddleware)
      .forRoutes({ path: '/users', method: RequestMethod.POST });
  }
}
