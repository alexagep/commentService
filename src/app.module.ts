import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostModule } from './posts/post.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { BenchmarkInterceptor } from './interceptors/benchmark.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import databaseConfig from './config/database.config';

@Module({
  //This block of code imports the necessary modules and components and declares the AppModule class with the @Module decorator.
  imports: [
    // Imports the TypeORM module with async configuration to connect to the database

    /* The TypeOrmModule.forRootAsync() method is used to set up the TypeORM module with a configuration
    object that allows the application to connect to the database. It takes an object with three properties: imports, useFactory, inject  */

    /* forRoot() is used to create a root TypeOrmModule instance with a database connection
    that is shared throughout the entire application. This method should be used only once
    in your application and typically is placed in the root or core module of your application. */
    TypeOrmModule.forRootAsync({

      /*  An array of modules that need to be imported to use this module. In this case, 
      it imports the ConfigModule which is required to load the configuration options. */
      imports: [
        /* The ConfigModule.forRoot() method is used to configure the application's environment variables or configuration files */
        // ConfigModule.forRoot() is responsible for loading the configuration files or variables needed by the application
        ConfigModule.forRoot({
          // Loads the `databaseConfig` file that returns the TypeOrmModuleOptions configuration
          // load: [databaseConfig] is used to load the configuration file (databaseConfig.ts)
          load: [databaseConfig],
        }),
      ],
      // Gets the TypeOrmModuleOptions configuration from the `configService` instance

      /* TypeOrmModuleOptions is an interface which represents the configuration options that
      can be passed to the TypeOrmModule.forRoot() method to configure the TypeORM. */

      /* useFactory is used to provide a factory function as a provider for a service.
      This is useful when you need to do some configuration or setup before providing the service */

      /* useFactory is a method used to dynamically create a provider. It is commonly used when the creation of a provider
      depends on some external factor, such as a configuration file or an environment variable.
      The useFactory method is used in conjunction with the TypeOrmModule.forRootAsync() method, which is used to configure
      and initialize a TypeORM connection asynchronously. The useFactory method is passed as an argument to TypeOrmModule.forRootAsync() and is responsible for creating the TypeORM connection. */

      // useFactory function is responsible for injecting configuration object and initializing the TypeORM module with it
      /* The configService.get<TypeOrmModuleOptions>('typeorm') statement retrieves the TypeORM configuration options from the
      ConfigService using the get method. The get method takes a generic type argument that specifies the type of the
      configuration object to be returned. In this case, it returns an object of type TypeOrmModuleOptions which contains the TypeORM configuration values. */
      useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>('typeorm'),

      // Injects the `configService` instance to get the configuration value
      /* Overall, injecting ConfigService allows us to easily retrieve and use configuration values throughout our application. */
      inject: [ConfigService],
    }),

    /* AuthModule, PostModule, CommentsModule, and LikesModule are imported modules that define the necessary providers,
    controllers, and services for authentication, post, comments, and likes functionality, respectively. */
    AuthModule,
    PostModule,
    CommentsModule,
    LikesModule,
  ],

  // Registers the AppController(the main controller for the application)
  controllers: [AppController],

  // Registers the AppService(the main service for the application), BenchmarkInterceptor and JwtAuthGuard as global providers
  // APP_INTERCEPTOR and APP_GUARD are constants used to inject the BenchmarkInterceptor and JwtAuthGuard into the main application, respectively.
  // provider is a class that can be injected into other classes as a dependency
  providers: [
    AppService,
    {
      //useClass is used to provide a class as a provider for a service

      /* Note that if the BenchmarkInterceptor(or JwtAuthGuard) class has its own dependencies (e.g. other services or repositories),
      NestJS will automatically inject those dependencies when creating a new instance of BenchmarkInterceptor(or JwtAuthGuard). */

      /* This means that whenever a class requests an instance of APP_INTERCEPTOR,
      an instance of BenchmarkInterceptor will be provided. */

      /* This means that whenever an instance of APP_INTERCEPTOR is required,
      NestJS will create a new instance of the BenchmarkInterceptor class using the new keyword.*/
      provide: APP_INTERCEPTOR,
      useClass: BenchmarkInterceptor,
    },
    {
      //useClass is used to provide a class as a provider for a service

      /* This means that whenever a class requests an instance of APP_GUARD, 
      an instance of JwtAuthGuard will be provided. */

       /* This means that whenever an instance of APP_GUARD is required,
      NestJS will create a new instance of the JwtAuthGuard class using the new keyword. */
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})

//This block of code defines and exports the AppModule class.
export class AppModule {}
