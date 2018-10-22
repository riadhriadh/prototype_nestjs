import { Controller,Get,Post,Request, Req ,Res,HttpCode, Param, Body, Query, HttpStatus,HttpException} from '@nestjs/common';
import { CatsService} from './cats.service';
import {Cat} from './cat.entity'
import {CreateCatDto} from './create-cat.deto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}
 @Get()
 async findAll(@Query() query): Promise<Cat[]> {
    return this.catsService.findAll();
    throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, 403);
  } 

 @Post('create')
async create(@Body() createCatDto :CreateCatDto){
    this.catsService.create(createCatDto);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
} 

}
