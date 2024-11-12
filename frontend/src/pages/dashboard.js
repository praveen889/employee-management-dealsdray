import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo/logo.png'
import './css/dashboard.css'

function Dashboard() {
  const navigate = useNavigate();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const handleNavigate = () => {
    navigate('/Employee')
  }
  useEffect(() =>{
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true')
  }, [])

  const handleLogout = () => {
		localStorage.removeItem('isLoggedIn')
		localStorage.removeItem('username')
		setIsLoggedIn(false);
		navigate("/");
	}

  const handleAddEmployee = () => {
    navigate('/Add');
  };

  const handleEditEmployee = () => {
    navigate('/Employee');
  };


  return (
    <div className="dashboard">
      <div className='navbar-dashboard'>
        <div className='navbar-first'>
          <img className='img-logo' src={Logo} alt=''/>
        </div>
        <div className='navbar-second'>
          <h2 className='nav-text'>Dashboard</h2>
        </div>
        <div className='navbar-third'>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className='dashboard-body'>
      <h2 className='dash-head'>Admin Dashboard</h2>
        <div className='dashboard-main'>
            <div className='add-employee'>
              <h3>Add Employee</h3>
              <p>Add a new Employee details <br/>to database</p>
              <button className='add-emp-btn' onClick={handleAddEmployee}>Add</button>
            </div>
            <div className='edit-employee'>
              <h3>Edit Employee</h3>
              <p>Edit a new Employee details <br/>to database</p>
              <button className='edit-emp-btn' onClick={handleEditEmployee}>Edit</button>
            </div>
          </div>
          <button className='emp-btn' onClick={handleNavigate}>Go to Employee List</button>
        </div>
    </div>
  );
}

export default Dashboard;
