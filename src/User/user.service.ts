import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.enitity";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  // Register a new user with hashed password
  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 12);  // Hashing the password before saving
    const user = this.repo.create({ email, password: hashed });
    return this.repo.save(user);  // Save the user to the database
  }

// Find a user by their email
async findByEmail(email: string) {
  return this.repo.findOne({ 
    where: { email },
    select: ['id', 'email', 'password'] 
  });
}

}
