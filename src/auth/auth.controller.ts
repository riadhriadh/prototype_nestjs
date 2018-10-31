import { Controller, Post, HttpStatus, HttpCode, Get, Response, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'users/users.service';
import { User } from 'users/user.entity';

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}
    @Post('login')
    async loginUser(@Response() res: any, @Body() body: User) {
      if (!(body && body.email && body.password)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email and password are required!' });
      }
  
      const user = await this.userService.getUserByEmail(body.email);
  
      if (user) {
        if (await this.userService.compareHash(body.password, user.password)) {
          return res.status(HttpStatus.OK).json(await this.authService.createToken(user.email));
        }
      }
  
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email or password wrong!' });
    } 
    @Post('register')
    async registerUser(@Response() res: any, @Body() body: User) {
      if (!(body && body.email && body.password && body.last_name && body.first_name)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
      }
  
      let user = await this.userService.getUserByEmail(body.email);
  
      if (user) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email exists' });
      } else {
        let userSave = await this.userService.create(body);
       if(userSave){
         body.password=undefined;
       }
        return res.status(HttpStatus.OK).json(userSave);
      }
    }
}
