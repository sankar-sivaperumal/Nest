import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signup(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // password  or email is missing
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    // email in db is exist
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // New user
    const user = await this.userService.register(email, password);
    
    return { message: 'User created successfully', userId: user.id };
  }
}
