import { ApiModelProperty } from '@nestjs/swagger';
export interface UserCreate {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  birthDay: Date;
}
