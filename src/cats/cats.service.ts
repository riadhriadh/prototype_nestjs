import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
@Injectable()
export class CatsService {
 
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}
  create(cat: Cat) {
    return  this.catRepository.save(cat);
  }

  findAll():  Promise<any> {
    return  this.catRepository.find();
  }
}
