import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { UsernameMustBeUnique } from "../user.custom.validation";

export class RegisterUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Validate(UsernameMustBeUnique)
  username: string

  @ApiProperty()
  @MinLength(8)
  password: string

}
