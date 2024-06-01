import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UserService } from './user.service';

@ValidatorConstraint({ name: 'usernameMustBeUnique', async: false })
export class UsernameMustBeUnique implements ValidatorConstraintInterface {

  constructor(private userService: UserService) { }

  async validate(text: string, args: ValidationArguments) {
    let user = await this.userService.getUserByUsername(text);

    if (user) {
      return false;
    } else {
      return true; // for async validations you must return a Promise<boolean> here
    }
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'User already exists';
  }
}