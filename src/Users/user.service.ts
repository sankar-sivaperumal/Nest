
//  import { Injectable } from '@nestjs/common';
// import { userDto } from '../dto/student.dto';
// import { plainToInstance } from 'class-transformer';
// import { validate } from 'class-validator';
// import { userDto} from './user.dto';

// @Injectable()
// export class UserService {
//   async createUser(input: userDto): Promise<userDto> {
  
//     const userDto = plainToInstance(userDto, input);
//     const errors = await validate(userDto);

//     if (errors.length > 0) {
//       throw new Error('Invalid input data');
//     }

//     return userDto;
//   }
// }

import { Injectable, BadRequestException } from '@nestjs/common';
import { StudentDto } from '../students/dto/student.dto'
import { Student } from '../students/student.entity';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  async createUser(input: any): Promise<StudentDto> {
  
    const userDto = plainToInstance(StudentDto, input);

  
    const errors = await validate(userDto);
    if (errors.length > 0) {
      const messages = errors
        .map(err => Object.values(err.constraints || {}).join(', '))
        .join('; ');
      throw new BadRequestException(`Validation failed: ${messages}`);
    }

   
    const studentEntity = new Student();
    Object.keys(userDto).forEach((key) => {
      if (userDto[key] !== undefined) {
        studentEntity[key] = userDto[key];
      }
    });

    return userDto;
  }
}
