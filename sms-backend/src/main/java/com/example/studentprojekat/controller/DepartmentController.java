package com.example.studentprojekat.controller;

import com.example.studentprojekat.dto.DepartmentDto;
import com.example.studentprojekat.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/departments")
@AllArgsConstructor
public class DepartmentController {

    private DepartmentService departmentService;

    // BUILD CREATE OR ADD DEPARTMENT REST API
    @PostMapping()
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
        DepartmentDto createdDepartment = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(createdDepartment, HttpStatus.CREATED);
    }

    // BUILD GET BY ID DEPARTMENT REST API
    @GetMapping("{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId){
        DepartmentDto departmentDto = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(departmentDto);
    }
    // BUILD GET BY ID DEPARTMENT REST API
    @GetMapping()
    public ResponseEntity<List<DepartmentDto>> getAllDepartments(){
        List<DepartmentDto> departmentsDto = departmentService.getAllDepartments();
        return ResponseEntity.ok(departmentsDto);
    }
    // BUILD UPDATED DEPARTMENT REST API
    @PutMapping("{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long departmentId,
                                                          @RequestBody DepartmentDto departmentDto){
        DepartmentDto updatedDepartmentDto = departmentService.updateDepartment(departmentId, departmentDto);
        return ResponseEntity.ok(updatedDepartmentDto);
    }

    // BUILD Delete DEPARTMENT REST API
    @DeleteMapping("{id}")
    public String deleteDepartment(@PathVariable("id") Long departmentId){

        departmentService.deleteDepartment(departmentId);
        return "Uspesno obrisan departman";
    }

}
