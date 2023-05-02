import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class BenchmarkInterceptor implements NestInterceptor {
  private readonly logger = new Logger(BenchmarkInterceptor.name);

  /* Observables are a way to represent streams of data that can be asynchronously observed over time.
  An observable represents a collection of values that arrive over time.
  observables allow us to subscribe to a stream of events, manipulate that stream of events, 
  and react to any changes that occur within that stream */

  /* The main difference between Observables and Promises in NestJS is that Observables 
  are lazy and can emit multiple values over time, while Promises are eager and can only 
  emit a single value. Observables also have more powerful operators for transforming and 
  combining data, while Promises have simpler error handling using try/catch blocks. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // This line of code allows you to access and manipulate the incoming request object
    /* The line const request: Request = context.switchToHttp().getRequest() gets the Request 
    object from the HttpArgumentsHost. The Request object contains information about the 
    incoming HTTP request, such as the HTTP method, the request URL, headers, 
    and the request payload */
    const request: Request = context.switchToHttp().getRequest(),
      method = request.method,
      url = request.url,
      now = Date.now();

    // when response is sent
    // callHandler executes the handle() method which runs route handler(it means if we don't use handle() method, our request won't reach to route handler)
    // tap() is used to perform some action after the response is sent
    // pipe is used to chain multiple operators together and apply them in sequence to the data stream emitted by the observable
    /* pipe and tap are operators used to manipulate the data emitted by an observable. */
    /* tap is an operator that allows you to inspect and potentially modify values emitted 
    by an observable without affecting the original data stream */

    /*handle() method executes the next interceptor in the chain or the route handler. 
    The pipe() method is used to create a new observable that passes the result of handle() 
    to any operators specified in the pipe.
    tap() is an operator that allows us to perform some action on the emitted value without 
    modifying*/
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `[${method} ${url}] Execution Time:  ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
