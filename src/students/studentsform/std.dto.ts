
// import { Type } from "class-transformer";
// import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional, IsDecimal } from "class-validator";


// export class stddto {

//     @IsString()
//     name: string;

//     @Type(() => Number)
//     @IsInt()
//     age: number;

//     @IsString()
//     gender: string;

//     @IsOptional()
//     @IsString()
//     city: string;

   
//     @IsDateString()
//     date_of_birth: string; 

//     @Type(() => Number)
//     @IsOptional()
//     @IsInt()
//     course_id: number;

//     @IsOptional()
//     @IsString()
//     course_name: string;

//     @IsOptional()
//     @IsString()
//     teacher_name: string;

//     @Type(() => Number)
//     @IsOptional()
//     @IsDecimal()
//     marks: number;
   


// }


// src/std.dto.ts (Recommended)

import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsOptional, Min } from "class-validator";

export class stddto {

    @IsNotEmpty({ message: 'name should not be empty' })
    @IsString({ message: 'name must be a string' })
    name: string;

    @Type(() => Number)
    @IsInt({ message: 'age must be an integer number' })
    @Min(0)
    @IsNotEmpty({ message: 'age should not be empty' })
    age: number;

    @IsNotEmpty({ message: 'gender should not be empty' })
    @IsString({ message: 'gender must be a string' })
    gender: string;

    @IsOptional()
    @IsString()
    city?: string; 

    @IsNotEmpty({ message: 'date_of_birth should not be empty' })
    @IsString() 

    date_of_birth: string; 
    
}