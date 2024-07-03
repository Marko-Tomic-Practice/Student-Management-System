package com.example.studentprojekat.mapper;

import com.example.studentprojekat.dto.StudentDto;
import com.example.studentprojekat.entity.Student;

public class StudentMapper {

    public static StudentDto mapToStudentDto(Student student){
        StudentDto studentDto = new StudentDto(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getDepartment().getId()
        );
        return studentDto;
        /* OVO JE U SLUCAJU POTREBE
       if (student.getDepartment() != null) {

        StudentDto haha = new StudentDto(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getDepartment().getId()
            );
            return haha;
         } else {
                StudentDto haha = new StudentDto(
                        student.getId(),
                        student.getFirstName(),
                        student.getLastName(),
                        student.getEmail(),
                        null
                );
                return haha;
            }
        */
    }

    public static Student mapToStudent(StudentDto studentDto){
        Student student = new Student();

        student.setId(studentDto.getId());
        student.setFirstName(studentDto.getFirstName());
        student.setLastName(studentDto.getLastName());
        student.setEmail(studentDto.getEmail());
        return  student;
    }
}
