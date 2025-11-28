
import { IsOptional, IsString, IsInt, IsDateString, IsDecimal, IsNumber,IsNotEmpty } from 'class-validator';



export class updatestd {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  age: number;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsDateString()
  date_of_birth: string;

  @IsInt()
  @IsOptional()
  enrollement_id:number;
  

  @IsOptional()
  @IsDecimal()
  marks: number;

  @IsOptional()
  @IsInt()
  course_id:number;

 
  
}


