import { Optional } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CourseDto {

@IsString()
@IsNotEmpty()
course_name: string;

@IsString()
@Optional()
teacher_name: string;

@IsOptional() 
@IsInt()
course_id?: number;

}