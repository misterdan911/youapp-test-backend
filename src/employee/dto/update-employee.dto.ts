import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {

    @ApiProperty()
    firstname: string;

    @ApiProperty()
    lastname: string
    
    @ApiProperty()
    position: string
    
    @ApiProperty()
    phone: string
    
    @ApiProperty()
    email: string

}
