import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as passport from 'passport';
import { JwtStrategy } from 'auth/passport/jwt.strategy';
import * as jwt from 'jsonwebtoken';
const config_projet = require('./projet_config');
import { UsersService } from 'users/users.service';
import { User } from 'users/user.entity';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  public resolve() {
    return async (req, res, next) => {
      if (req.headers.authorization) {
        console.log('token : ', req.headers.authorization);
        const token = req.headers.authorization;
        const decoded=null;
        try {
        const decoded: any = jwt.verify(token, config_projet.secret);
       } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
          },
          403,
        );
       }
       
        if (decoded) {
          console.log('decoded :', decoded);
          if (decoded.email) {
            const user = await this.usersService.getUserByEmail(decoded.email);
            if (user) {
              console.log('user', user);
              next();
            } else {
              throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'This is a custom message',
                },
                403,
              );
            }
          } else {
            throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
              },
              403,
            );
          }
        } else {
          throw new HttpException(
            {
              status: HttpStatus.FORBIDDEN,
              error: 'This is a custom message',
            },
            403,
          );
        }
      }else{
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
          },
          403,
        );
      }
    };
  }
}
