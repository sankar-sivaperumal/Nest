
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional, IsDecimal, IsArray } from "class-validator";


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
    @IsDecimal()    
    marks: number;

    @IsOptional()
    @IsString({ each: true })
    files:string[]
 }

