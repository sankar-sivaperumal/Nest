import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Student} from '../students/student.entity';
import { Course } from '../courses/courses.entity';

@Entity({ name: 'enrollments' })
export class Enrollment {
  static push(arg0: { enrollment_id: any; marks: any; course_id: any; }) {
    throw new Error('Method not implemented.');
  }
 @PrimaryGeneratedColumn()
  enrollment_id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  marks: number;

  @ManyToOne(() => Student, (students) => students.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  students: Student;

  @ManyToOne(() => Course, (courses) => courses.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  courses: Course;




}
