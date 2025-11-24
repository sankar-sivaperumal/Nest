import { Body, Controller, Delete, Get,Param, Patch, Post, Put,} from '@nestjs/common';
import { Response } from 'express'; 
import { EnrollmentsDto } from './dto/enrollments.dto'; 
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollments.entity';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { log } from 'console';


@Controller('enrollments')
export class EnrollmentsController {
      constructor(private readonly evc: EnrollmentsService) {}

  @Post()
  create(@Body() Enrollment: Partial<Enrollment>) {
    console.log("posted");
    return this.evc.create(Enrollment);
  }

  @Get()
  findAll() {
    console.log("value geted")
    return this.evc.findAll();
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



