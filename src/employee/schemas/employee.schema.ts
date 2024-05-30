import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  
  @Prop()
  firstname: string;
  
  @Prop()
  lastname: string;
  
  @Prop()
  position: string;
  
  @Prop()
  phone: string;
  
  @Prop()
  email: string;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);