import React, {useEffect, useState} from 'react'
import { deleteStudent, listStudents } from '../services/StudentService';
import { useNavigate } from 'react-router-dom';

const ListStudentComponent = () => {

    const [students, setStudents] = useState([]);

    const navigator = useNavigate(); // DODATO DA BI MOGLI DA PREUSMERAVAMO STRANICE

    useEffect(() => {
        getAllStudents();
    }, []); //DODAT PRAZAN NIZ:= Runs only on the first render
    // JEDNA OD KRUD OPERACIJA: GET
    function getAllStudents(){
        listStudents().then((response)=>{
            setStudents(response.data);    
                }).catch(error => {
                    console.error(error);
                });
    }

    // PREUSMERAVA NA DRUGU STRANICU
    function addNewStudent(){
        navigator('/add-student');
    }

    // PREUSMERAVA NA DRUGU STRANICU X2
    function updateStudent(id){
        navigator(`/edit-student/${id}`);
    }
    // JEDNA OD KRUD OPERACIJA: DELETE
    function removeStudent(id){
        console.log(id);

        deleteStudent(id).then((response)=>{
        getAllStudents();
        }).catch(error => {
            console.log(error);
        })
    }

  return (
    <div className='container'> 
        <h2>List of Students</h2>
        <button className='btn btn-primary mb-2' onClick={addNewStudent}>Add student</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Student First Name</th>
                    <th>Student Last Name</th>
                    <th>Student E-mail</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {   // IZLISTAVA SVE STUDENTE IZ NIZA
                    students.map((student)=>
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                        <td>
                            <button className='btn btn-info' onClick={() => updateStudent(student.id)}>Update</button>
                            <button className='btn btn-danger' onClick={() => removeStudent(student.id)}style={{marginLeft: '10px'}}>Delete</button>
                        </td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListStudentComponent