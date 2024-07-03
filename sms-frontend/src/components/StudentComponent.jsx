import React, { useEffect, useState } from 'react'
import { createStudent, getStudent, updateStudent } from '../services/StudentService';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllDepartments } from '../services/DepartmentService';


const StudentComponent = () => {
    
    //  PODESAVAM POCETNI I SLEDECI ZA SLEDECE PARAMETRE
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])
    
    //DODAJEM NAVIGATOR DA BIH NAKON POPUNJAVANJA FORME SE VRATIO NA LISTU STUDENATA
    const navigator = useNavigate();

    const {id} = useParams(); //Izvlacim id iz tekuceg URL-a
    
    //  PODESAVAM POCETNU (BEZ GRESKE) I TEKUCE GRESKE UKOLIKO POSTOJE
    const [errors, setErrors]= useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    })
    // OVO JE DODATO DA BI SE CUVALI PODACI PRILIKOM PROMENE
    function handleFirstName(e){
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    useEffect(()=>{
        if(id){ //AKO IMAMO ID, IZVUCI PODATKE O TEKUCEM STUDENTU PO ID-U
            getStudent(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id])

    function saveOrUpdateStudent(e){
        e.preventDefault(); //DA SPRECIMO BROWSER DA RELOAD/REFRESH TOKOM POPUNJAVANJA FORME!
        
        const student = {firstName, lastName, email, departmentId};
        console.log(student);
        
        if(validateForm()){
            if(id){
                // JEDNA OD KRUD OPERACIJA: PUT
                updateStudent(id, student).then((response)=>{
                    console.log(response.data);
                    navigator('/students');
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                // JEDNA OD KRUD OPERACIJA: POST
                    createStudent(student).then((response)=>{
                    console.log(response.data);
                    navigator('/students');
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {...errors};

        if(firstName.trim()){
            errors.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errors.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errors.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if(departmentId){
            errorsCopy.department = ''
        } else {
            errorsCopy.department = 'Select Department'
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }
    
    //  PODESAVAM NASLOV STRANICE U SLUCAJU DA LI MENJAMO ILI DODAJEMO STUDENTA
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Edit Student</h2>
        } else {
            return <h2 className='text-center'>Add Student</h2>
        }
    }

    return (
    <div className='container'>
        <br /> <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle() //PROMENA NASLOVA U ZAVISNOSTI OD SLUCAJA
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                            type='text'
                            placeholder='Enter Student First Name'
                            name='firstName'
                            value={firstName}
                            className={`form-control ${ errors.firstName ? 'is-invalid': '' }`}
                            onChange={handleFirstName}
                            >
                            </input>
                            { errors.firstName && <div className='invalid-feedback'>{ errors.firstName }</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                            type='text'
                            placeholder='Enter Student Last Name'
                            name='lastName'
                            value={lastName}
                            className={`form-control ${ errors.lastName ? 'is-invalid': '' }`}
                            onChange={handleLastName}
                            >
                            </input>
                            { errors.lastName && <div className='invalid-feedback'>{ errors.lastName }</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>E-mail:</label>
                            <input
                            type='text'
                            placeholder='Enter Student E-mail'
                            name='email'
                            value={email}
                            className={`form-control ${ errors.email ? 'is-invalid': '' }`}
                            onChange={handleEmail}
                            >
                            </input>
                            { errors.email && <div className='invalid-feedback'>{ errors.email }</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Select Department:</label>
                                <select
                                  className={`form-control ${ errors.department ? 'is-invalid': '' }`}
                                  value={departmentId}
                                  onChange={(e) => setDepartmentId(e.target.value)}  
                                >
                                    <option value="Select Department">Select Department</option>
                                    {
                                        departments.map(department => 
                                        <option key={department.id} value={department.id}>{department.departmentName}</option>
                                        )
                                    }
                                </select>
                            { errors.department && <div className='invalid-feedback'>{ errors.department }</div>}
                        </div>
                        
                        <button className='btn btn-success' onClick={saveOrUpdateStudent}>Submit</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StudentComponent