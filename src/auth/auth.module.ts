import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; 
import { UserService } from '../User/user.service';
import { JwtAuthGuard } from './jwt.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../User/user.enitity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard], 
})
export class AuthModule {}
