import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Enrollment } from "../enrollments/enrollments.entity"
import { IsOptional } from "class-validator";


@Entity({name: 'courses'})
export class Course{
    @IsOptional()
    @PrimaryColumn()
    course_id:number;

    @Column({length:100,unique:true ,nullable:false})
    course_name:string;


    @IsOptional()
    @Column ({length:100})
    teacher_name:string;

    @OneToMany(() => Enrollment, (enr: Enrollment) => enr.courses)
    enrollments: Enrollment[];
} 

