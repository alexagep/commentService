import {
  HttpException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    // const id
    Logger.log('*******MIDDLEWARE**********', req.body);
    if (email && password) {
      next();
    } else {
      throw new HttpException('Email and password are required', 400);
    }
  }
}
