import { Body, Controller, Delete, Get,Param, Patch, Post, Put, Query,} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollments.entity';



@Controller('enrollments')
export class EnrollmentsController {
      constructor(private readonly evc: EnrollmentsService) {}

  @Post()
  create(@Body() Enrollment: Partial<Enrollment>) {
    console.log("posted");
    return this.evc.create(Enrollment);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const result = await this.evc.findAll(page, limit);
    return result;  
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("get the value sucess")
    return this.evc.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Enrollment>) {
    return this.evc.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evc.remove(+id);
  }
}



