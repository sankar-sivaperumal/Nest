import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Course } from './courses.entity';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {

constructor(private readonly cvs: CoursesService) {}

      @Post()
      create(@Body() Course: Partial<Course>) {
        return this.cvs.create(Course);
      }
    
      @Get()
      findAll() {
        return this.cvs.findAll();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.cvs.findOne(+id);
      }
    
      @Put(':id')
      update(@Param('id') id: string, @Body() body: Partial<Course>) {
        return this.cvs.update(+id, body);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.cvs.remove(+id);
      }
}
