import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Enrollment } from '../enrollments/enrollments.entity';

@Entity({ name: 'students' })
export class Student {
  
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ length: 60,nullable:false })
  name: string;

  @Column({ type: 'tinyint',nullable:false })
  age: number;

  @Column({ type: 'char', length: 1 ,nullable:false })
  gender: string;

  @Column({ length: 100, nullable: true })
  city?: string;

  @Column({ type: 'date', nullable: false })
  dob: Date;


  @Column('simple-array', { nullable: true })
  files: string[];

  @OneToMany(() => Enrollment, (enr: Enrollment) => enr.students)
  enrollments: Enrollment[];

}
