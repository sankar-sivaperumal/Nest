
//  import { Controller, Post, Body, BadRequestException, ValidationPipe, UsePipes } from '@nestjs/common';
//  import { UserService } from './user.service';
//  import { StudentDto } from '../dto/student.dto';

//  @Controller('students')
//  export class UserController {
//    constructor(private readonly userService: UserService) {}

//    @UsePipes(new ValidationPipe({ 
//      transform: true, 
//      whitelist: true,         
//      forbidNonWhitelisted: true 
//    }))
  
//    @Post('user')
//    async createUser(@Body() body: StudentDto) {
//     try {
//       const userDto = await this.userService.createUser(body);
//       return userDto
//      } 
//      catch (error) {
//        throw new BadRequestException('An internal server error occurred.');
//      }
//    }
// }

import { Controller, Post, Body, UsePipes, ValidationPipe, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentDto } from '../students/dto/student.dto'
import { UserService } from './user.service';

@Controller('students')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  @UseInterceptors(FileInterceptor('file')) 
  @UsePipes(
    new ValidationPipe({
      transform: true,               
      whitelist: true,               
      forbidNonWhitelisted: true,    
      exceptionFactory: (errors) => {
        const allowedFields = Object.keys(new StudentDto()).join(', ');
        return new BadRequestException(`Invalid fields provided. Allowed fields: ${allowedFields}`);
      },
    }),
  )
  async createUser(
    @Body() body: any,            
    @UploadedFile() file?: Express.Multer.File
  ) {
    try {
    
      const userDto = await this.userService.createUser(body);
      return userDto;
    } catch (error) {
      throw new BadRequestException(error.message || 'An internal server error occurred.');
    }
  }
}
