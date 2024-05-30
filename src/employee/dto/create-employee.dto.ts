import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {

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
