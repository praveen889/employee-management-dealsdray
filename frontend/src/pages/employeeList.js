import React, { useEffect, useState } from 'react';
import Logo from '../logo/logo.png';
import './css/employeeList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const handleAdd = () =>{
     navigate('/Add')
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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getEmployee');
        setEmployees(response.data);
        setFilteredEmployees(response.data); 
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteEmployee/${id}`);
      if (response.status === 200) {
        setEmployees(employees.filter((employee) => employee._id !== id));
      } else {
        alert('Failed to delete employee');
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert('Failed to delete employee');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 3) {
      const filtered = employees.filter((employee) =>
        employee.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEmployees(filtered);
      setIsPopupOpen(true);
    } else {
      setFilteredEmployees(employees); 
      setIsPopupOpen(false);
    }
  };

  const handleEmployeeClick = (id) => {
    navigate(`/edit/${id}`);
    setIsPopupOpen(false);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className='employee-page'>
      <div className='navbar-dashboard'>
        <div className='navbar-first'>
          <img className='img-logo' src={Logo} alt='' />
        </div>
        <div className='navbar-second'>
          <h2 className='nav-text'>Employee List</h2>
        </div>
        <div className='navbar-third'>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className='search-bar'>
        <input
          placeholder='Search employee by name'
          className='search-input'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className='ad-btn' onClick={handleAdd}>Add Employee</button>
      </div>

      {isPopupOpen && (
        <div className="search-popup">
          <div className="search-popup-overlay" onClick={handlePopupClose}></div>
          <div className="search-popup-content">
            <h3>Search Results</h3>
            {filteredEmployees.length > 0 ? (
              <p>
                {filteredEmployees.map((employee) => (
                  <p
                    key={employee._id}
                    onClick={() => handleEmployeeClick(employee._id)}
                    className="search-result-item"
                  >
                    {employee.name}
                  </p>
                ))}
              </p>
            ) : (
              <p>No employees found</p>
            )}
            <button className="close-popup" onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}

      <div className='list-heading'>
        <p className='employee-id'>Id</p>
        <p className='employee-img'>Image</p>
        <p className='employee-name'>Name</p>
        <p className='employee-email'>Email</p>
        <p className='employee-phone'>Phone No.</p>
        <p className='employee-designation'>Designation</p>
        <p className='employee-gender'>Gender</p>
        <p className='employee-course'>Course</p>
        <p className='employee-createdDate'>Created Date</p>
        <p className='employee-action-h'>Action</p>
      </div>

      <div className='list'>
        {employees.map((item) => (
          <div className='list-form' key={item._id}>
            <div className='employee-id'>
              <p className='list-t'>{item.id}</p>
            </div>
            <div className='employee-img'>
              <img className='employee-profileImg' src={`http://localhost:5000${item.image}`} alt={item.name} />
            </div>
            <div className='employee-name'>
              <p className='list-t'>{item.name}</p>
            </div>
            <div className='employee-email'>
              <p className='list-t'>{item.email}</p>
            </div>
            <div className='employee-phone'>
              <p className='list-t'>{item.phone}</p>
            </div>
            <div className='employee-designation'>
              <p className='list-t'>{item.designation}</p>
            </div>
            <div className='employee-gender'>
              <p className='list-t'>{item.gender}</p>
            </div>
            <div className='employee-course'>
              <p className='list-t'>{item.course}</p>
            </div>
            <div className='employee-createdDate'>
              <p className='list-td'>{item.createdDate}</p>
            </div>
            <div className='employee-action'>
              <button 
                className='edit-btn'
                onClick={() => handleEdit(item._id)}
              >
                Edit
              </button>
              <button 
                className='delete-btn'
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
