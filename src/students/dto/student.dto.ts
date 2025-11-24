// import { Type } from "class-transformer";
// import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional, IsDecimal, IsArray, ValidateNested, IsNumber} from "class-validator";
// import { Enrollment } from "src/enrollments/enrollments.entity";
// import { markAsUncloneable } from "worker_threads";

// export class StudentDto {
//     @IsString()
//     @IsNotEmpty()
//     name: string;

//     @IsInt()
//     @IsNotEmpty()
//     age: number;

//     @IsString()
//     @IsNotEmpty()
//     gender: string;

//     @IsOptional()
//     @IsString()
//     city: string;

//     @IsNotEmpty()
//     @IsDateString() 
//     date_of_birth: string; 
//   course_id: any;
//   marks: null;
//   course_name: any;
//   teacher_name: any;


//     }

// export class EnrollmentsDto {
 
//   @IsInt()
 
//   course_id: number;
  
//   @IsOptional()
//   @IsNumber()
//   marks: number;
// }



/*import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional, IsNumber, IsDecimal } from "class-validator";

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
  date_of_birth: string;


  @IsInt()

  @IsOptional()
  enrollement_id:number;

  @IsNotEmpty()
  @IsNumber()
  marks?: number;


  @IsString()
  @IsOptional()
  course_name: string;

  @IsString()
  @IsOptional()
  teacher_name: string;

 

  @IsOptional()
  @IsInt()
  course_id?: number;
  course: any;
}

*/

import { IsInt, IsNotEmpty, IsString, IsDateString, IsOptional, IsDecimal } from "class-validator";

export class StudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

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
    date_of_birth: string; 

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



    




  

