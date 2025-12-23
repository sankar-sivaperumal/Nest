import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; 

import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AuthModule } from './auth/auth.module'; 
import { UsersModule } from './User/user.module';

import { Student } from './students/student.entity';
import { Course } from './courses/courses.entity';
import { Enrollment } from './enrollments/enrollments.entity';
import { User } from './User/user.enitity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

  
    JwtModule.register({
      global: true, 
      secret: process.env.JWT_SECRET || 'supersecretkey',
      signOptions: { expiresIn: '1h' },
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
        entities: [Student, Course, Enrollment, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule, 
    StudentsModule,
    CoursesModule,
    EnrollmentsModule,
  ],
})
export class AppModule {}
