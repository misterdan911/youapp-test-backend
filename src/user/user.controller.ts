import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('User')
@ApiHeader({
  name: 'x-access-token',
  description: 'Access token',
})
// @ApiBearerAuth()
// @ApiBearerAuth('defaultBearerAuth')
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @ApiCreatedResponse({
    description: 'Profile has been created',
    // type: 'haha',
  })
  @UseGuards(AuthGuard)
  @Post('createProfile')
  async createProfile(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    console.log('req:', req.user);
    // let result = await this.userService.createProfile(createProfileDto);
    return { message: "Hello" };
  }

}
