import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import LoginResult from './custom.type';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    this.authService.register(registerUserDto);
    return { message: 'User has been created successfully' };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const loginResult: LoginResult = await this.authService.login(loginUserDto);

    if (loginResult.status == 'failed') {
      return {
        message: 'User not found',
      };
    }

    return {
      message: 'User has been logged in successfully',
      access_token: loginResult.access_token,
    };
  }
}
