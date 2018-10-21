import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import {CatsModule} from '../cats/cats.module';
import {CatsController} from '../cats/cats.controller'

@Module({
  imports: [UsersModule,CatsModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController,CatsController],
})
export class AuthModule {}
 
