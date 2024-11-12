import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../logo/logo.png';
import './css/edit.css';

function EditEmployee() {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

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
  const handleNavigate = () => {
    navigate("/Employee")
  }

  
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    gender: '',
    course: [],
    createdDate:'',
    image: ''
  });
  
  
  useEffect(() => {
    axios.get(`http://localhost:5000/getEmployee/${id}`)
      .then(response => setFormData(response.data))
      .catch(error => console.error("Error fetching employee data:", error));
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox") {
      const updatedCourses = checked
        ? [...formData.course, value]
        : formData.course.filter(course => course !== value);
      setFormData({ ...formData, course: updatedCourses });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'course') {
        formDataToSend.append(key, JSON.stringify(formData[key])); 
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.put(`http://localhost:5000/updateEmployee/${id}`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Employee updated successfully!");
      navigate('/Employee'); 
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="body">
      <div className="navbar-dashboard">
        <div className="navbar-first">
          <img className="img-logo" src={Logo} alt="Logo" />
        </div>
        <div className="navbar-second">
          <h2 className="nav-text">Edit Employee</h2>
        </div>
        <div className="navbar-third">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
      <div className="edit-form">
        <form className="employee-update-form" onSubmit={handleSubmit}>
        <button className='back-btn' onClick={handleNavigate}>Go to Employee List</button>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mobile No</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Course</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  checked={formData.course.includes('MCA')}
                  onChange={handleChange}
                />
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  checked={formData.course.includes('BCA')}
                  onChange={handleChange}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  checked={formData.course.includes('BSC')}
                  onChange={handleChange}
                />
                BSC
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Created Date</label>
            <input
              type="date"
              name="createdDate"
              value={formData.createdDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Image Upload</label>
            <input type="file" name="image" onChange={handleChange} />
          </div>

          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
