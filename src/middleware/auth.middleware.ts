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
    const { id } = req.body;
    Logger.log('*******MIDDLEWARE**********', req.body);
    if (id) {
      next();
    } else {
      throw new HttpException('userID is required', 400);
    }
  }
}
