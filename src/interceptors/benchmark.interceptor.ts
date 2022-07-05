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
    //executionContext inherits from ArgumentsHost which includes some helper functions to write more readable interceptors
    //before request reaches the handler
    console.log(`Endpoint:  ${request.url}, Method: ${request.method}`);

    //when response is sent
    //callHandler executes the handle() method which runs route handler(it means if we don't use handle() method, our request won't reach to route handler)
    //tap() is used to perform some action after the response is sent
    //pipe() is used to perform some action before the response is sent
    return next
      .handle()
      .pipe(tap(() => console.log(`Execution Time:  ${Date.now() - now}ms`)));
  }
}
