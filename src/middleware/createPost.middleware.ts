import {
  HttpException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CreatePostMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { content } = req.body;
    Logger.log('*******Create Post MIDDLEWARE**********', req.method);
    if (content) {
      next();
    } else {
      throw new HttpException('content is required', 400);
    }
  }
}
