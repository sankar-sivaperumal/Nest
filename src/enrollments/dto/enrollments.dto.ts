import { IsDecimal, IsInt, IsNumber, IsOptional } from 'class-validator';



export class EnrollmentsDto {
  
  @IsOptional()
  @IsInt()
  enrollement_id: number;

  @IsOptional()
  @IsInt()
  student_id: number;

  @IsOptional()
  @IsInt()
  course_id: number;
  
  @IsOptional()
  @IsDecimal()
  marks: number;
}