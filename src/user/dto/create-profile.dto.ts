import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  height: string;

  @ApiProperty()
  weight: string;

  @ApiProperty()
  interests: Array<string>;
}
