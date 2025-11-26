import { Controller, Post, Body, UseInterceptors, UploadedFiles, UsePipes, ValidationPipe } from '@nestjs/common';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { stdservice } from './newstudent.service';
import { stddto } from './std.dto';

@Controller('students')
export class stdcontroller {
  constructor(private readonly studentsServices: stdservice) {}

 @Post('form')
 @UseInterceptors(AnyFilesInterceptor()) 
 @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
 create(@Body() createStudentDto: stddto) {
  return this.studentsServices.create(createStudentDto);
  }
}
   



  
