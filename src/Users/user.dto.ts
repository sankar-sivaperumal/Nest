import { Type } from "class-transformer";
import {   IsInt, IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber, IsArray } from "class-validator";

export class userDto {
    
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
    city?: string;

    @IsNotEmpty()
    @IsDateString()
    date_of_birth: string; 

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    course_id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    marks?: number;
   
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    files?: string[];
}
