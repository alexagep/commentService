import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './access.decorator';

// The @Injectable() decorator is used to declare that this class is an injectable dependency.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // canActivate is an interface that is used to implement guards
  // Current execution context. Provides access to details about the current request pipeline.
  canActivate(context: ExecutionContext) {
    /* Reflector is a tool that helps us inspect and retrieve metadata from classes and their 
    properties. It is like a detective that can tell us information about the code we write. 
    For example, we can use Reflector to check if a method or a class has a certain decorator 
    or to retrieve the value of a metadata property that we defined in a class. It helps us to 
    write cleaner and more organized code, because we can use metadata to describe what a class 
    or a method does, and then use Reflector to retrieve that metadata and perform some action 
    based on it. */

    /* It is used to retrieve metadata associated with a given key, from the target class or method, 
    and its superclasses. 
    if there is only one metadata, we can use the get method instead of getAllAndOverride. 
    The get method retrieves the value of a single metadata item for a given key, and returns undefined if no metadata is found*/
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      /*context.getHandler() returns the handler function that will be responsible for processing the incoming request, 
      and context.getClass() returns the class that the handler function belongs to. */
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    /*If the isPublic variable is not true, this will call the canActivate method of 
    the parent class, AuthGuard, which performs the actual JWT authentication. 
    If the authentication succeeds, the request is allowed to proceed, and if it fails, 
    an error response is returned. */
    return super.canActivate(context);
  }
}
