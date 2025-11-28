
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { StudentsModule } from 'src/students/students.module';


@Module({
  imports: [StudentsModule],
  controllers: [UserController],
  providers: [UserService],
})


export class UserModule {}
