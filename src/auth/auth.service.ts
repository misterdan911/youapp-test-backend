import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { UserService } from 'src/user/user.service';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {

  private jwtOptions: {};

  constructor(private readonly jwtService: JwtService) {

    this.jwtOptions = {
      secret: 'secretKey',
      // verify: { algorithms: ['HS256'] }
    };

  }

  @Inject(UserService)
  private readonly userService: UserService;

  async register(registerUserDto: RegisterUserDto) {
    const createdUser = await this.userService.register(registerUserDto);
    return createdUser;
  }

  async login(loginUserDto: LoginUserDto) {

    const result = await this.userService.checkUserLogin(loginUserDto);
    // console.log('result:', result);

    if (!result) {
      return false;
    }

    const payload = {
      username: loginUserDto.username,
      // sub: user._id
    };

    let access_token = this.jwtService.sign(payload, this.jwtOptions)
    return access_token;
  }

  validate(payload) {
    return { userId: payload.sub, username: payload.username };
  }
}
