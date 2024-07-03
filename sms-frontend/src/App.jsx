import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListStudentComponent from './components/ListStudentComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentComponent from './components/StudentComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes>
            // http://localhost:3000
            // ZA BASE URL SAMO IZLISTAJ STUDENTE
            <Route path='/' element = {<ListStudentComponent/>}></Route>
            
            // http://localhost:3000/students
            //  TAKODJE I ZA /students page IZLISTAJ STUDENTE
            <Route path='/students' element = {<ListStudentComponent/>}></Route>

            // http://localhost:3000/add-student
            //  UKOLIKO TREBAMO DA DODAMO STUDENTA PREUSMERI ME NA StudentComponent
            <Route path='/add-student' element={<StudentComponent/>}></Route>

            // http://localhost:3000/edit-student/:id
            //  TAKODJE UKOLIKO TREBAMO DA IZMENIMO STUDENTA PREUSMERI ME NA StudentComponent
            //  stavili smo :id da bi u StudentComponent izvukli id koji nam je potreban!
            <Route path='/edit-student/:id' element={<StudentComponent/>}></Route>
            
            // http://localhost:3000/departments
            <Route path='/departments' element={<ListDepartmentComponent/>}></Route>

            // http://localhost:3000/departments
            <Route path='add-department' element={<DepartmentComponent/>}></Route>

            // http://localhost:3000/departments
            <Route path='/edit-department/:id' element={<DepartmentComponent/>}></Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
