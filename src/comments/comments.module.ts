import {
  Module,
  forwardRef,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from '../entities/comments.entity';
import { LikesModule } from '../likes/likes.module';
import { PostModule } from '../posts/post.module';
import { CreateCommentMiddleware } from '../middleware/createComment.middleware';

@Module({
  imports: [
    /* The forwardRef() function is used to resolve circular dependencies. 
    In this case, the LikesModule is imported as a dependency, but it also depends on CommentsModule. 
    By using forwardRef(), the circular reference is resolved and the modules can be imported 
    without errors. */
    forwardRef(() => LikesModule),

    /*The TypeOrmModule.forFeature() method is used to provide access to the specified(Comments) repository, 
    which is an entity in the TypeORM database. */
    TypeOrmModule.forFeature([Comments]),

    /* This means that the providers and controllers of PostModule will be available for use in CommentsModule. 
    This can be useful if the CommentsController needs to interact with resources provided by the PostModule */
    PostModule,
  ],
  /* The providers array defines the services that are available within the module. 
  In this case, the only provider is CommentsService. */
  providers: [CommentsService],
  controllers: [CommentsController],

  //The exports array defines the services that are available for use by other modules
  exports: [CommentsService],
})

// The NestModule interface is implemented to allow middleware to be applied to the module
export class CommentsModule implements NestModule {

  // The configure() method is used to apply the CreateCommentMiddleware middleware to the POST /comments endpoint
  configure(consumer: MiddlewareConsumer) {
    // The consumer.apply() method is used to apply the middleware
    consumer.apply(CreateCommentMiddleware).forRoutes({
      path: '/comments',
      method: RequestMethod.POST,
    });
  }
}
