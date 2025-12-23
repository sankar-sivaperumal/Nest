import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../User/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    try {
      //  Find user by email
      const user = await this.usersService.findByEmail(email);


      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid email or password');
      }

      //  Prepare JWT Payload
      const payload = {
        sub: user.id,
        email: user.email,
      };

      //  Generate Access Token
        const accessToken = this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET || 'defaultsecretkey',
        expiresIn: '1h',
      });

      return {
        access_token: accessToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      // Log unexpected errors 
      console.error('Login Process Error:', error.message);
      throw new InternalServerErrorException('An internal error occurred during login');
    }
  }
}
