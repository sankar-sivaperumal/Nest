import {Injectable,UnauthorizedException,InternalServerErrorException,NotFoundException,BadRequestException,} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';
import { UserService } from '../User/user.service';
import * as nodemailer from 'nodemailer';

const secretKey = 'myLocalSecretKey';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwt: JwtService,
  ) {}

  // LOGIN 
  async login(email: string, encryptedPassword: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) throw new NotFoundException('User not found');

      const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      const isMatch = await bcrypt.compare(decryptedPassword, user.password);
      if (!isMatch) throw new UnauthorizedException('Invalid password');

      const payload = { sub: user.id, email: user.email };
      const accessToken = this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      });

      return { access_token: accessToken };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error('Login Error:', error.message);
      throw new InternalServerErrorException('Login failed');
    }
  }

  // FORGOT PASSWORD
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    // Generate reset token (15 minutes)
    const resetToken = this.jwt.sign(
      { sub: user.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: 'Reset your password',
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    return { message: 'Password reset link sent to your email' };
  }

  // RESET PASSWORD 
  async resetPassword(token: string, encryptedPassword: string) {
    try {
      const payload = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new NotFoundException('User not found');

      // decrypt new password
      const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
      const newPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (!newPassword) {
        throw new BadRequestException('Invalid password');
      }

      const hashed = await bcrypt.hash(newPassword, 12);
      await this.usersService.updatePassword(user.id, hashed);

      return { message: 'Password reset successful' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
