import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { resourceLimits } from 'worker_threads';

@ApiTags('Auth')
@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    this.authService.register(registerUserDto);
    return { "message": "User has been created successfully" };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    let accessToken = await this.authService.login(loginUserDto);

    console.log('accessToken:', accessToken)

    if (!accessToken) {
      return {
        "message": "User not found"
      }
    }

    // console.log('accessToken:', accessToken);

    return {
      "message": "User has been logged in successfully",
      "access_token": accessToken
    };
  }

}
