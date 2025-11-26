
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional, IsDecimal } from "class-validator";


export class stddto {

    @IsString()
    name: string;

    @Type(() => Number)
    @IsInt()
    age: number;

    @IsString()
    gender: string;

    @IsOptional()
    @IsString()
    city: string;

   
    @IsDateString()
    date_of_birth: string; 

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

    
    @IsString({ each: true })
    files:string[]
 }

