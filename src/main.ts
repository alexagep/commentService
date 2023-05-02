import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  const config = new DocumentBuilder()
    .setTitle('Crud using NestJS + JWT + pg + TypeORM')
    .setDescription('The NestJS API')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  /* This is configuring a global validation pipe for the NestJS application.

      In NestJS, pipes are used to intercept and transform data before it is processed by
      a controller or a service.

      The ValidationPipe is a built-in pipe that can be used to automatically validate incoming 
      requests based on the specified validation rules. By default, it uses the class-validator 
      library to perform the validation.

      In the code snippet, the ValidationPipe is instantiated with an option of 
      whitelist: true, which means that any incoming data that does not match the defined validation 
      rules will be automatically removed from the request object. This is useful for ensuring 
      that only valid data is processed by the application */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
