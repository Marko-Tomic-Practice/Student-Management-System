package com.example.studentprojekat.repository;

import com.example.studentprojekat.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Long> {
}
