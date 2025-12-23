import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })  // Ensure that email is unique
  email: string;

  @Column()
  password: string;
}
