
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { StudentsModule } from 'src/students/students.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [StudentsModule,EnrollmentsModule],
  controllers: [UserController],
  providers: [UserService],
})


export class UserModule {}
