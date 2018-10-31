import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'users/users.service';
const  config_projet =require("../projet_config");
var fs = require('fs');
@Injectable()
export class AuthService {
  
  constructor(private readonly usersService: UsersService) { }
 
  
  async createToken(email: string) {
    const expiresIn = 6000 * 60;
    const secretOrKey = fs.readFileSync("./key.pem");;
    const user = { email };
    
     const token = jwt.sign(user, secretOrKey,   { audience: 'urn:foo' });
   
  
    return { expires_in: expiresIn, token };
  }
  async validateUser(signedUser): Promise<boolean> {
    if (signedUser && signedUser.email) {
      return Boolean(this.usersService.getUserByEmail(signedUser.email));
    }

    return false;
  }
}
