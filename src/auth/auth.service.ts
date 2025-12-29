import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
import { UserService } from '../User/user.service';

const secretKey = "myLocalSecretKey"; 

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, encryptedPassword: string) {
    try {
      //  Find user by email
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Decrypt AES password from frontend
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      // Compare decrypted password with hashed password in DB
      const isMatch = await bcrypt.compare(decryptedPassword, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }

      // Prepare JWT payload
      const payload = { sub: user.id, email: user.email };

      const accessToken = this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET || 'defaultsecretkey',
        expiresIn: '1h',
      });

      return { access_token: accessToken };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Login Process Error:', error.message);
      throw new InternalServerErrorException('An internal error occurred during login');
    }
  }
}
