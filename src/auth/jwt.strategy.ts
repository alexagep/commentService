import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


/* the token gets decoded by using the JwtStrategy class. 
This class extends the PassportStrategy class
which is a built-in middleware for handling authentication in NestJS. */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /* In the constructor of this class, we can define the options for how to 
  extract and decode the token, such as the secret key to use. */
  constructor() {
    super({
      // Extract JWT from authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /* validate is a callback function that is called by Passport.js after the token 
  has been extracted and decoded by the strategy

  When the token is sent with an incoming request, passport-jwt extracts the token 
  from the request and passes it to the validate method 
  
  The validate method is responsible for decoding and validating the token payload. 
  In this method, you can perform any additional validation checks on the payload or 
  extract additional information from it that you need to use in your application*/
  async validate(payload: any) { // Asynchronous method to validate JWT payload
    return {
      id: payload.id, // Returning only the user id from JWT payload
    };
  }
}
