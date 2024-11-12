import React, { useEffect, useState } from 'react';
import './css/loginandsignup.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../logo/logo.png'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  useEffect(() =>{
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true'){
      navigate('/Dashboard')
    }
  }, [navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/login', {email, password})
    .then(result => {
      console.log(result)
      if(result.data === "Successfully Login"){
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('email', email);
        navigate('/Dashboard')
      } else{
        alert('Username or password is wrong')
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div className='body'>
      <div className='navbar'>
        <img className='logo' src={Logo} alt=''/>
      </div>
      <div className='main-form'>
        <div className='login-form' onSubmit={handleLogin}>
          <h1 className='heading-l'>Login</h1>
          <input 
            type='email'
            className='username-input'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input 
            type='password'
            className='password-input'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button type='submit' className='login-btn' onClick={handleLogin}>Login</button>
          <div className='botton-form'>
          <p className='last-t'>Don't have an account?
            <Link to={"/Signup"} style={{color:'#000', marginLeft:'2%'}}>Signup</Link>
          </p>
        </div>
        </div>
      </div>
    </div>
    
  );
}

export default Login;
