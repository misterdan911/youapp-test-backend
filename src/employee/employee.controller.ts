import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './schemas/employee.schema';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {

    let employeeData: Employee = await this.employeeService.create(createEmployeeDto);

    let response = {
      status: "success",
      data: employeeData
    };

    return response;
  }

  @Get()
  async findAll() {

    let employeeData: Employee[] = await this.employeeService.findAll();

    let response = {
      status: "success",
      data: employeeData
    };

    return response;
  }

  // @Post(/checkUniqueEmail)

  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }
  */

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {

    if (typeof updateEmployeeDto.email != 'undefined') {
      let result = await this.employeeService.checkUniqueEmail(id, updateEmployeeDto.email);

      console.log('result: ', result);

      if (result == true) {
        let response = {
          status: "failed",
          message: "Email has already been used"
        };

        return response;
      }
    }

    let updateResult = await this.employeeService.update(id, updateEmployeeDto);

    let response = {
      status: "success",
      message: "Employee data has been successfully updated"
    };

    return response;
  }

  /*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
  */
}
