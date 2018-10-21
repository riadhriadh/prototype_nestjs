import { ApiModelProperty } from '@nestjs/swagger';
export  class UserCreate {
@ApiModelProperty({ required: true, maxLength: 100 })
  last_name: string;
  @ApiModelProperty({ required: true, maxLength: 100 })
  first_name: string;
  @ApiModelProperty({ required: true, maxLength: 100 })
  email: string;
  @ApiModelProperty({ required: true, maxLength: 100 })
  password: string;
  @ApiModelProperty({ required: true })
  birthDay: Date;
}
