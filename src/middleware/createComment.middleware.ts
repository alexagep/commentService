import {
  HttpException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CreateCommentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { content, postId } = req.body;
    Logger.log('*******Create Comment MIDDLEWARE**********', req.method);
    if (content && postId) {
      next();
    } else {
      throw new HttpException('content & postId are required', 400);
    }
  }
}
