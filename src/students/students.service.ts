import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDto } from './dto/student.dto';
import { updatestd } from './dto/patch.dto';
import { Enrollment } from 'src/enrollments/enrollments.entity';
import { Course } from 'src/courses/courses.entity';



@Injectable()
export class StudentsService
{
   constructor(
    @InjectRepository(Student) private  readonly repo:Repository<Student>,
    @InjectRepository(Enrollment) private readonly epo: Repository<Enrollment>,
    @InjectRepository(Course) private cro:Repository<Course>,) {}


  async findAll() {
    const query = `
      SELECT s.*, e.enrollment_id, e.marks
      FROM students s
      LEFT JOIN enrollments e ON e.student_id = s.student_id
    `;
    return this.repo.query(query);
  }


  async findOne(id: number) {
    const query = `
      SELECT s.*, e.enrollment_id, e.marks
      FROM students s
      LEFT JOIN enrollments e ON e.student_id = s.student_id
      WHERE s.student_id = ?
      limit 1
    `;
    const result = await this.repo.query(query, [id]);
    return result[0];
  }


  
   async findByGender(gender: string) {
    const query = `
    select * From students where gender=?`;
    return await this.repo.query(query,[gender])
     }

   
async create(dto: StudentDto) {
  if (!dto.course_id) {
    
    throw new Error('Course ID must be provided ID Must Be 101 - 105 ');
  }
  const { insertId: student_id } = await this.repo.query(
    `INSERT INTO students (name, age, gender, city, date_of_birth) VALUES (?, ?, ?, ?, ?)`,
    [dto.name, dto.age, dto.gender, dto.city, dto.date_of_birth]
  );

  const { insertId: enrollment_id } = await this.epo.query(
    `INSERT INTO enrollments (student_id, marks, course_id) VALUES (?, ?, ?)`,
    [student_id, dto.marks, dto.course_id]  
  );

  const courses = await this.epo.query(
    `SELECT c.course_id, c.course_name, c.teacher_name
     FROM courses c
     JOIN enrollments e ON e.course_id = c.course_id
     WHERE e.enrollment_id = ?`,
    [enrollment_id]
  );

  return { student_id, enrollments: [{ enrollment_id, marks: dto.marks }], courses };
}

     //Patch method
async update(id: number, dto:updatestd) {
    const query = `
  UPDATE students
  SET name = ?,age = ?, gender = ?, city = ?, date_of_birth = ? 
  WHERE student_id = ?;
`;
    return this.repo.query(query, [
      dto.name,
      dto.age,
      dto.gender,
      dto.city,
      dto.date_of_birth,

    ]);
  }

   // Put method
  async updates(id: number, dto: StudentDto) {
  const query = `
    UPDATE students
    SET name = ?, age = ?, gender = ?, city = ?, date_of_birth = ?
    WHERE student_id = ?
  `;

  return this.repo.query(query, [
    dto.name,
    dto.age,
    dto.gender,
    dto.city,
    dto.date_of_birth,
    
    id,
  ]);
}


  async delete(id: number) {
    const query = `
      DELETE FROM students
      WHERE student_id = ?
    `;
    return this.repo.query(query, [id]);
  }
}

