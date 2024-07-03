package com.example.studentprojekat.service.impl;

import com.example.studentprojekat.dto.StudentDto;
import com.example.studentprojekat.entity.Department;
import com.example.studentprojekat.entity.Student;
import com.example.studentprojekat.exception.ResourceNotFoundException;
import com.example.studentprojekat.mapper.StudentMapper;
import com.example.studentprojekat.repository.DepartmentRepository;
import com.example.studentprojekat.repository.StudentRepository;
import com.example.studentprojekat.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;
    private DepartmentRepository departmentRepository;
    @Override
    public StudentDto createStudent(StudentDto studentDto) {

        Student student = StudentMapper.mapToStudent(studentDto);

        Department department = departmentRepository.findById(studentDto.getDepartmentId())
                .orElseThrow(()-> new ResourceNotFoundException("No Department with that ID"));
        student.setDepartment(department);
        Student savedStudent = studentRepository.save(student);
        StudentDto savedStudentDto = StudentMapper.mapToStudentDto(savedStudent);

        return savedStudentDto;
    }

    @Override
    public StudentDto getStudentById(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(()->
                        new ResourceNotFoundException("There isn't student with given ID: "+studentId));

        StudentDto studentDto = StudentMapper.mapToStudentDto(student);

        return studentDto;
    }

    @Override
    public List<StudentDto> getAllStudents() {

        List<Student> students = studentRepository.findAll();

        List<StudentDto> studentsDto = students.stream().map((student)-> StudentMapper.mapToStudentDto(student))
                .collect(Collectors.toList());

        return studentsDto;
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto studentDto) {

        Student student = studentRepository.findById(studentId).orElseThrow(()->
                new ResourceNotFoundException("There isn't student with given ID: "+studentId));

        student.setFirstName(studentDto.getFirstName());
        student.setLastName(studentDto.getLastName());
        student.setEmail(studentDto.getEmail());

        Department department = departmentRepository.findById(studentDto.getDepartmentId())
                .orElseThrow(()-> new ResourceNotFoundException("No Department with that ID"));
        student.setDepartment(department);

        Student updatedStudent = studentRepository.save(student);

        return StudentMapper.mapToStudentDto(updatedStudent);
    }

    @Override
    public void deleteStudent(Long stundentId) {
        Student student = studentRepository.findById(stundentId)
                .orElseThrow(
                        ()-> new ResourceNotFoundException("Nepostoji zaposljeni sa tim ID: "+stundentId));
        studentRepository.deleteById(stundentId);
    }
}
