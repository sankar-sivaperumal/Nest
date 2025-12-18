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


  async findAll(
    page: number,
    limit: number,
    sortField?: keyof Student,
    sortOrder: "asc" | "desc" = "asc",
    filters?: Partial<Record<keyof Student, string>>
  ) {
    const offset = (page - 1) * limit;
    const params: any[] = [];

    // Build WHERE clause dynamically
    const where = filters
      ? Object.entries(filters)
          .filter(([_, value]) => value)
          .map(([key, value]) => {
            params.push(`%${value}%`);
            return `s.${key} LIKE ?`;
          })
          .join(" AND ")
      : "";

    const whereClause = where ? `WHERE ${where}` : "";

    // Build ORDER BY clause
    const orderClause = sortField ? `ORDER BY s.${sortField} ${sortOrder.toUpperCase()}` : `ORDER BY s.student_id ASC`;

    // Main query with JOIN and pagination
    const query = `
      SELECT s.*, e.enrollment_id, e.marks
      FROM students s
      LEFT JOIN enrollments e ON e.student_id = s.student_id
      ${whereClause}
      ${orderClause}
      LIMIT ? OFFSET ?
    `;
    params.push(limit, offset);

    const data = await this.repo.query(query, params);

    // Count total records with same filters
    const countParams = params.slice(0, params.length - 2); // exclude limit & offset
    const countQuery = `SELECT COUNT(*) as total FROM students s ${whereClause}`;
    const totalResult = await this.repo.query(countQuery, countParams);
    const total = totalResult[0]?.total || 0;

    return { data, total, page, limit };
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

// Create a Records
async create(dto: StudentDto) {
  if (!dto.course_id) {
        throw new Error(`Course ID must be provided ID Must Be (101 - 105 )
          101 - "Maths",
          102 -"Physics",
          103 -"Chemistry",
          104 -"Computer Science",
          105 - "English"`);
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

// patch method
/* async update(id: number, dto: Partial<updatestd>) {
  return this.repo.update(id, dto); 
}  */

///Patch method
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
    id,
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

//  Delete Records
  async delete(id: number) {
    const query = `
      DELETE FROM students
      WHERE student_id = ?
    `;
    return this.repo.query(query, [id]);
  }




}


