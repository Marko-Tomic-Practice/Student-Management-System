import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/students';


// IZLISTAJ SVE STUDENTE
// http://localhost:8080/api/students
export const listStudents = () => {
    return axios.get(REST_API_BASE_URL);
}

// NAPRAVI STUDENTA, GENERISE SE SAM ID
// http://localhost:8080/api/students 
// UZIMAMO PARAMETRE IZ STUDENTA
export const createStudent = (student) => {
    return axios.post(REST_API_BASE_URL, student);
}

//UZMI STUDENTA PO ID
// http://localhost:8080/api/students/${studentId}

export const getStudent = (studentId) => {
    return axios.get(REST_API_BASE_URL + '/' + studentId);
}

// UPDATEUJEMO STUDENTA, PO ID-U
// http://localhost:8080/api/students/${studentId}
// ZATIM STAVLJAMO PARAMETRE IZ STUDENTA (+ NESTO JOVINO ZA CROSS ORIGIN)
export const updateStudent = (studentId, student) => {
    return axios.put(REST_API_BASE_URL + '/' + studentId, student, 
        
    {
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json;charset=UTF-8',}
    }
    );
}

// BRISEMO STUDENTA PO ID-U
// http://localhost:8080/api/students/${studentId}
export const deleteStudent = (studentId) => {
    return axios.delete(REST_API_BASE_URL + '/' + studentId);
}