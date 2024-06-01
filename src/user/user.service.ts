import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordService } from './password.service';


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

  async checkUserLogin(loginUserDto: LoginUserDto) {
    let user = await this.userModel.findOne({ username: loginUserDto.username });

    if (!user) {
      user = await this.userModel.findOne({ email: loginUserDto.email });
      if (!user) { return false; }
    }

    // console.log('user:', user);

    let result = await this.passwordService.comparePassword(loginUserDto.password, user.password);
    // console.log('result:', result);

    if (!result) { return false; }

    return true;
  }


  /*
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  */
}
