import React, { useState, useEffect } from 'react';
import Logo from '../logo/logo.png';
import './css/edit.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState([]); 
    const [createdDate, setCreatedDate] = useState(''); 
    const [image, setImage] = useState(null); 
    const [showPopup, setShowPopup] = useState(false); 
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const navigate = useNavigate()

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
        navigate('/Employee')
    }

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCourse([...course, value]);
        } else {
            setCourse(course.filter((c) => c !== value));
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', JSON.stringify(course));
        formData.append('createdDate', createdDate); 
        formData.append('image', image);

        axios.post('http://localhost:5000/addEmployee', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log(result);
            setShowPopup(true); 
            setTimeout(() => setShowPopup(false), 3000); 
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="body">
            <div className="navbar-dashboard">
                <div className="navbar-first">
                    <img className="img-logo" src={Logo} alt="" />
                </div>
                <div className="navbar-second">
                    <h2 className="nav-text">Add Employee</h2>
                </div>
                <div className="navbar-third">
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="edit-form">
                <form className="employee-update-form" onSubmit={handleAdd}>
                    <button className='back-btn' onClick={handleNavigate}>Go to Employee List</button>
                    <div className="form-group">
                        <label>ID</label>
                        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Mobile No</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Designation</label>
                        <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <div>
                            <label>
                                <input type="radio" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                                Male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                                Female
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Course</label>
                        <div>
                            <label>
                                <input type="checkbox" value="MCA" checked={course.includes('MCA')} onChange={handleCourseChange} />
                                MCA
                            </label>
                            <label>
                                <input type="checkbox" value="BCA" checked={course.includes('BCA')} onChange={handleCourseChange} />
                                BCA
                            </label>
                            <label>
                                <input type="checkbox" value="BSC" checked={course.includes('BSC')} onChange={handleCourseChange} />
                                BSC
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Created Date</label>
                        <input
                            type="date"
                            value={createdDate}
                            onChange={(e) => setCreatedDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Img Upload</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <button type="submit" className="update-btn">Add Employee</button>
                    {showPopup && (
                        <div className="popup">
                            <p>Employee added successfully!</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
