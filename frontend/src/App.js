import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import EditEmployee from './pages/editEmployee';
import EmployeeList from './pages/employeeList';
import AddEmployee from './pages/addEmployee';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Login/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path='/Dashboard' element={<Dashboard/>}></Route>
        <Route path='/Edit/:id' element={<EditEmployee/>}></Route>
        <Route path='/Add' element={<AddEmployee/>}></Route>
        <Route path='/Employee' element={<EmployeeList/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;