package com.example.studentprojekat.repository;

import com.example.studentprojekat.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> { //OVO OMOGUCAVA CRUD OPERACIJE
                                                                                //NAD Department ENTITETOM
}
