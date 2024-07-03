package com.example.studentprojekat.controller;


import com.example.studentprojekat.dto.StudentDto;
import com.example.studentprojekat.entity.Student;
import com.example.studentprojekat.service.StudentService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/students")
@AllArgsConstructor
public class StudentController {

    private StudentService studentService;

    //CREATE STUDENT
    @PostMapping()
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto){

        StudentDto savedStudent = studentService.createStudent(studentDto);

        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    //GET STUDENT BY ID
    @GetMapping("{id}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable("id") Long studentId){

        StudentDto studentDto = studentService.getStudentById(studentId);

        return ResponseEntity.ok(studentDto);
    }

    //GET ALL STUDENTS
    @GetMapping()
    public ResponseEntity<List<StudentDto>> getAllStudents(){
        List<StudentDto> studentsDto = studentService.getAllStudents();

        return ResponseEntity.ok(studentsDto);
    }

    //UPDATE STUDENT

    @PutMapping("{id}")
    public  ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long studentId,
                                                     @RequestBody StudentDto studentDto){
        StudentDto updatedStudentDto = studentService.updateStudent(studentId,studentDto);
        /*System.out.println("Tu sam");*/
        return ResponseEntity.ok(updatedStudentDto);
    }

    @DeleteMapping()
    public String deleteStudent(@PathVariable("id") Long studentId){
        studentService.deleteStudent(studentId);
        return "Uspesno obrisan student";
    }
}
