import { ApiModelProperty } from '@nestjs/swagger';
export class CreateCatDto {
  readonly id: number;
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly age: number;
  @ApiModelProperty()
  readonly breed: string;
}
