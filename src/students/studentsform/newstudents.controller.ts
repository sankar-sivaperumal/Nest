import { Controller, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { stdservice } from '../studentsform/newstudent.service';
import { stddto } from './std.dto';

@Controller('students')
export class stdcontroller {
  constructor(private readonly studentservice: stdservice) {}

  @Post('form')
  @UseInterceptors(AnyFilesInterceptor({ dest: './files' })) 
  async create(
    @Body() createStudentDto: stddto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log(createStudentDto)
    return this.studentservice.create(createStudentDto, files);
  }
}
