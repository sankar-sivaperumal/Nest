import { Injectable } from '@nestjs/common';
import { userDto } from './user.dto';
import { StudentDto } from 'src/students/dto/student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/students/student.entity';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(Student)
      private userrepo: Repository<Student>,
    ) {}
  private user(input: any): userDto {
    const dto = new userDto();
    dto.name = input.name;
    dto.age = input.age;
    dto.gender = input.gender;
    dto.date_of_birth = input.date_of_birth;
    dto.city = input.city;
    dto.course_id = input.course_id;
    dto.marks = input.marks;
    dto.files = input.files;
    return dto;
  }

  // async createUser(input: any, files: Express.Multer.File[]): Promise<userDto> {
  //   const createdUserDto = this.user(input);
  //   console.log(createdUserDto);
  //   return createdUserDto


   async createUser(input: any, files: Express.Multer.File[]): Promise<userDto> {
  const student = this.userrepo.create({ ...input, files });
  const savedStudent = await this.userrepo.save(student);
  return this.createUser(savedStudent,files);
}
  }

 


/* @Injectable()
export class UserService {
  constructor(
    @InjectRepository(Student)
    private userrepo: Repository<Student>,
  ) {}

  async createUser(input: userDto, files: Express.Multer.File[]) {
  
    const fileNames = files?.map(f => f.filename) ?? [];

      const userEntity = this.userrepo.create({
      ...input,
      files: fileNames, 
    });

      const savedUser = await this.userrepo.save(userEntity);

    return savedUser; 
  }
}
 */


/* import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/student.entity';
import { StudentDto } from '../students/dto/student.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createUser(
    input: StudentDto,
    file?: Express.Multer.File[],
  ): Promise<Student> {
    const student = this.studentRepository.create({
      ...input,
      file: file?.map((file) => ({
        filename: file.originalname,
        path: file.path,
      })),
    });

    const savedStudent = await this.studentRepository.save(student);

    return savedStudent; 
  }
}
 */