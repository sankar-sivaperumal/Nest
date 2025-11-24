import { IsOptional, IsString, IsInt, IsDateString, IsDecimal, IsNumber,IsNotEmpty } from 'class-validator';
import { Enrollment } from 'src/enrollments/enrollments.entity';


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
  
    @IsNotEmpty()
    @IsNumber()
    marks: number;

}


