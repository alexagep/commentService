import {
  HttpException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CreateMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    Logger.log('*******Create MIDDLEWARE**********', req.method);
    if (name && email && password) {
      next();
    } else {
      throw new HttpException('Name, Email, Password are required', 400);
    }
  }
}
