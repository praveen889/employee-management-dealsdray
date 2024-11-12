import React, { useState } from 'react';
import './css/loginandsignup.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../logo/logo.png'
import axios from 'axios'

function Singup() {
  const [username, setUsername ] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/signup',{username, email, phone, password})
    .then(result => {console.log(result)
      navigate('/')
    })
    .catch(err => console.log(err))
  };


  return (
    <div className='body'>
      <div className='navbar'>
        <img className='logo' src={Logo} alt=''/>
      </div>
      <div className='main-form'>
        <div className='login-form'>
          <h1 className='heading-s'>Singup</h1>
          <input 
            type='text'
            className='username-input-s'
            name='name'
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
          <input 
            type='email'
            className='email-input'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input 
            type='text'
            className='phone-input'
            name='mobileNo'
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Phone No.'
          />
          <input 
            type='password'
            className='password-input'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button className='login-btn' onClick={handleSignup}>Sign In</button>
          <div className='botton-form'>
          <p className='last-t'>Don't have an account?
            <Link to={"/"} style={{color:'#000', marginLeft:'2%'}}>Login</Link>
          </p>
        </div>
        </div>
      </div>
    </div>
    
  );
}

export default Singup;
