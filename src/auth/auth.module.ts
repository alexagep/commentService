// Import required modules from NestJS and external packages
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  // Define the modules to be imported
  imports: [
    /* PassportModule enables the application to authenticate users using various strategies 
    such as local strategy, JWT strategy, OAuth strategy, etc.
    we can use it to protect our routes with different authentication strategies provided by Passport. 
    We can also extend these strategies or create our own custom strategies if necessary.
    This means that the routes in the AuthController can be protected using Passport authentication strategies.*/
    PassportModule,

    /*JwtModule.registerAsync() is a method used to asynchronously configure the JwtModule. 
    The JwtModule provides functionality to sign and verify JSON Web Tokens (JWT) used for 
    authentication and authorization */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // By using useFactory, the configuration options can be created asynchronously by calling an async function
      // Set JWT options asynchronously, using ConfigService to read environment variables
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
      // the useFactory function is using the ConfigService to retrieve the JWT_SECRET value from the application's environment variables
      inject: [ConfigService],
    }),
  ],
  // Define the controllers and providers to be registered
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // Export AuthService so that it can be used in other modules
  exports: [AuthService],
})
export class AuthModule {}
