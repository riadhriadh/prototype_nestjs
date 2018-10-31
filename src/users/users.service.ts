import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreate } from './user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  private saltRounds = 10;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(user: UserCreate) {
    user.password = await this.getHash(user.password);

    // clear password as we don't persist passwords

    return this.userRepository.save(user);
  }
  findAll(): Promise<any> {
    return this.userRepository.find();
  }
 
  async getUserByEmail(email: string): Promise<User> {
    return (await this.userRepository.find({ email }))[0];
  }
  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
