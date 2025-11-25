import { Controller, Get, Post, Body, Param, Put, Delete, Patch, Query, HttpStatus, Res} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
import { updatestd } from './dto/patch.dto'
import type { Response } from 'express';



@Controller('students')
export class StudentsController {
  constructor(
   private readonly svc: StudentsService){}
 

  @Get()
  async findAll(): Promise<StudentDto> {
    // console.log(Get);
    return  await this.svc.findAll();
  }

  @Get()
   async findByGender(@Query('gender') gender: string) {
    return await this.svc.findByGender(gender);
  } 
  
/*   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(+id);
  }
*/

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const students = await this.svc.findOne(+id);
    // console.log(Student);
    if (!students) {
      console.log("no data ");
    return res   
      .status(HttpStatus.NO_CONTENT)
      .json({ message: 'Student record not found' });
  }
  return res.status(HttpStatus.OK).json(students);
  }



 @Post()
  async create(@Body() students: StudentDto) { 
    // console.log(students);
      return await this.svc.create(students);
  }

  @Put(':id')
  async replace(@Param('id') id: string, @Body() dto: StudentDto) {
    return await this.svc.updates(+id, dto);
    }


@Patch(':id')
      update(@Param('id') id: string, @Body() dto: updatestd) {
     return this.svc.update(+id, dto);
     }
    
//   @Patch(':id')  
//   async update(@Param('id') id: string, @Body() dto: updatestd) 
//   {
//     // console.log(Patch)
//   return  await this.svc.update(+id, dto);
// }


  @Delete(':id')
async  remove(@Param('id') id: string) {
    return  await this.svc.delete(+id);
  }
}




