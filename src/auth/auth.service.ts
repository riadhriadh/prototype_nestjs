import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
const  config_projet =require("../projet_config");
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }
  async createToken(email: string) {
    const expiresIn = 6000 * 60;
    const secretOrKey = 'secret';
    const user = { email };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return { expires_in: expiresIn, token };
  }
  async validateUser(signedUser): Promise<boolean> {
    if (signedUser && signedUser.email) {
      return Boolean(this.usersService.getUserByEmail(signedUser.email));
    }

    return false;
  }
}
