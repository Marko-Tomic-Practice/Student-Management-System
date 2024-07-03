import React, { useEffect, useState } from 'react'
import { getAllDepartments, removeDepratment } from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';

const ListDepartmentComponent = () => {

    const [departments, setDepratments] = useState([]);

    const navigator = useNavigate();

    useEffect(()=>{
       listAllDepartments(); 
    }, [])

    function listAllDepartments(){
        getAllDepartments().then((response) => {
            console.log(response.data);
            setDepratments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function updateDepartment(id){
        navigator(`/edit-department/${id}`);
    }

    function deleteDepartment(id){
        removeDepratment(id)
                        .then((response) => {
                            console.log(response.data);
                            listAllDepartments();
                        }).catch((error)=>{
                            console.error(error);
                        })
    }
  return (
    <div className='container'>
        <h2 className='text-center'>List of Departments</h2>
        <Link to='/add-department' className='btn btn-primary mb-2'>Add department</Link>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    departments.map(department => 
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                            <button onClick={()=>updateDepartment(department.id)} className='btn btn-info'>Update</button>
                            <button onClick={()=>deleteDepartment(department.id)} className='btn btn-danger'>Delete</button>
                        </td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent