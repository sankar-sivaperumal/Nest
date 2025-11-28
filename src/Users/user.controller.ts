import { Controller,  Post,  Body,  UploadedFiles,  UseInterceptors,  UsePipes,  ValidationPipe,  BadRequestException,} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { userDto } from './user.dto';
import { StudentDto } from 'src/students/dto/student.dto';
import * as fs from 'fs';

@Controller('students')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  @UseInterceptors(AnyFilesInterceptor({ dest: './files' }))
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async create(
    @Body() body: userDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
    for (const file of files) {
    
        if (!fs.existsSync(file.path)) {
          throw new BadRequestException('Folder not accessible.');
        }
      }
      return await this.userService.createUser(body, files);
    } catch (error) {
      throw new BadRequestException(error.message);
    }   
  }
}
 



