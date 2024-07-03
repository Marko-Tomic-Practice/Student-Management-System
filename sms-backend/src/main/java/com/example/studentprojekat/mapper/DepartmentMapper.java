package com.example.studentprojekat.mapper;

import com.example.studentprojekat.dto.DepartmentDto;
import com.example.studentprojekat.entity.Department;

public class DepartmentMapper {

    //CONVERT DEPARTMENT JPA ENTITY INTO DEPARTMENT DTO
    public static DepartmentDto mapToDepartmentDto(Department department){
        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDescription()
        );
    }

    //CONVERT DEPARTMENT DTO INTO DEPARTMENT JPA ENTITY

    public static Department mapToDepartment(DepartmentDto departmentDto){
        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDescription()
        );
    }
}

