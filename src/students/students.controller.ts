import { Controller, Get, Post, Body, Param, Put, Delete, Patch, Query, HttpStatus, Res} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
import { updatestd } from './dto/patch.dto'
import type { Response } from 'express';

@Controller('students')
export class StudentsController {
  constructor(  private readonly svc: StudentsService){}
   
  // Get All Students Record
  @Get()
  async findAll(): Promise<StudentDto[]> {
    return  await this.svc.findAll();
  }

  // Get By Gender
    @Get('gender')
    async findByGender(@Query('gender') gender: string) {
    return await this.svc.findByGender(gender);
  } 

  // Get By ID
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const students = await this.svc.findOne(+id);
      if (!students) {
      console.log("no data ");
    return res   
      .status(HttpStatus.NO_CONTENT)
      .json({ message: 'Student record not found' });
  }
  return res.status(HttpStatus.OK).json(students);
  }


  // Create a New Record
  @Post()
  async create(@Body() students: StudentDto) { 
   return await this.svc.create(students);
  }

  // Modify All Records
   @Put(':id')
   async updates(@Param('id') id: string, @Body() dto: StudentDto) {
   return await this.svc.updates(+id, dto);
  }



    //Update New Values OR Modify a Single Record 
  @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: updatestd) {
    return await  this.svc.update(+id, dto);
  }

  // Remove Records
  @Delete(':id')
    async  remove(@Param('id') id: string) {
    return  await this.svc.delete(+id);
  }
}




 



