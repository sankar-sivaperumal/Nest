
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional, IsDecimal } from "class-validator";

export class StudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsDateString()
    dob: string; 

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    course_id: number;

    @IsOptional()
    @IsString()
    course_name: string;

    @IsOptional()
    @IsString()
    teacher_name: string;

   
    @IsOptional()
    @IsDecimal()
    marks: number;
   
}

  

