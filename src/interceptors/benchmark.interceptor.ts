import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class BenchmarkInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();

    const now = Date.now();
    console.log(`Endpoint:  ${request.url}, Method: ${request.method}`);

    return next
      .handle()
      .pipe(tap(() => console.log(`Execution Time:  ${Date.now() - now}ms`)));
  }
}
