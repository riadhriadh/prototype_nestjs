import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiModelProperty()
  @Column({ length: 500, nullable: true })
  last_name: string;

  @ApiModelProperty({ required: true, maxLength: 50 })
  @Column({ length: 500, nullable: true })
  first_name: string;

  @ApiModelProperty({ minLength:7 ,required: true })
  @Column({ unique: true })
  email: string;

  @ApiModelProperty({ required: true, maxLength: 100 })
  @Column({ length: 500, nullable: true })
  password: string;

  @ApiModelProperty({ required: true })
  @Column({ type: 'date' })
  birthDay: Date;

}