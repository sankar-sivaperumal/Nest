import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { Student } from './students/student.entity';
import { Course } from './courses/courses.entity'; 
import { Enrollment } from './enrollments/enrollments.entity';
import { stdservice } from './students/studentsform/newstudent.service';
import { stdcontroller } from './students/studentsform/newstudents.controller';
import { fileservice } from './students/uploads/file.service';
import { filecontroller } from './students/uploads/file.controller';
import { UserController } from './Users/user.controller';
import { UserService } from './Users/user.service';
import { UserModule } from './Users/user.module';

@Module({
  imports: [
     
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Student, Course, Enrollment],
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    StudentsModule,
    CoursesModule,
    EnrollmentsModule,
    UserModule
  ],
})
export class AppModule {}
