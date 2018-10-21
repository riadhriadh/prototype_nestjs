import { Module , NestModule,MiddlewareConsumer , RequestMethod } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { CatsController } from 'cats/cats.controller';
import { CatsService } from 'cats/cats.service';
import { CatsModule } from 'cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersController } from 'users/users.controller';
import { UsersService } from 'users/users.service';
import { UsersModule } from 'users/users.module';
import { AuthService } from './auth/auth.service';
 import { AuthController } from './auth/auth.controller';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(),CatsModule, UsersModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService,AuthService],
})
export class AppModule {

  // constructor(private readonly connection: Connection) {
    
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
