import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {
  
  constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<Employee>) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const createdEmployee = await this.employeeModel.create(createEmployeeDto);
    return createdEmployee;
  }

  async findAll() {
    let result = await this.employeeModel.find();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeeModel.updateOne({ _id: id }, { $set: updateEmployeeDto });
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }

  async checkUniqueEmail(userId: any, email: string) {
    let result = await this.employeeModel.findOne({email: email});

    // console.log('checkUniqueEmail: ' + result);

    if (!result) {
      return false;
    }
    else {
      if (userId == result._id) { return false; }
      return true;
    }
  }


}
