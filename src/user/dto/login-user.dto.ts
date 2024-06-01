import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { UsernameMustBeUnique } from "../user.custom.validation";

export class LoginUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  username: string

  @ApiProperty()
  password: string

}
