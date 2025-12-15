import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from '../students/student.entity';
import { Course } from '../courses/courses.entity';

@Entity({ name: 'enrollments' })
export class Enrollment {
  @PrimaryGeneratedColumn()
  enrollment_id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  marks: number;

  @ManyToOne(() => Student, (student) => student.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })  
  students: Student;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })  
  courses: Course;
}
