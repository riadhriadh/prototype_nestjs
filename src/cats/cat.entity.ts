import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiModelProperty({ required: true, maxLength: 50 })
  @Column({ length: 500 })
  name: string;
  @ApiModelProperty({ required: true, maxLength: 50 })
  @Column({ length: 500 })
  breed: string;
  @ApiModelProperty({ required: true, maxLength: 50 })
  @Column('int')
  age: number;

}