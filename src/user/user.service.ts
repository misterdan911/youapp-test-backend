import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordService } from './password.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import CheckLoginResult from './custom.type';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService
  ) { }

  async register(registerUserDto: RegisterUserDto) {
    registerUserDto.password = await this.passwordService.hashPassword(registerUserDto.password);
    const createdUser = await this.userModel.create(registerUserDto);
    return createdUser;
  }

  async getUserByUsername(userName: string) {
    let user = await this.userModel.findOne({ username: userName });
    return user;
  }

  async checkUserLogin(loginUserDto: LoginUserDto): Promise<CheckLoginResult> {

    let loginResult: CheckLoginResult = {
      status: 'failed',
      user: {},
    };
    
    let user = await this.userModel.findOne({ username: loginUserDto.username });

    if (!user) {
      user = await this.userModel.findOne({ email: loginUserDto.email });

      if (!user) {
        loginResult.status = 'failed';
        return loginResult;
      }
    }

    // console.log('user:', user);

    let passwordMatch = await this.passwordService.comparePassword(loginUserDto.password, user.password);
    // console.log('result:', result);

    if (!passwordMatch) {
      loginResult.status = 'failed';
      return loginResult;
    }

    loginResult.status = 'success';
    loginResult.user = user;

    return loginResult;
  }

  async createProfile(createProfileDto: CreateProfileDto) {
    // throw new Error('Method not implemented.');
    // userModel.updateOne
  }

}
