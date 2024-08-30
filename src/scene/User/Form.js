import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import CSS
import './Form.css';

export default function Form() {
  const [isRegister, setRegister] = useState(true);  
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState("Submit");
  const navigate = useNavigate();

  // Check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home'); 
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    setLoading("Loading...");
    e.preventDefault();
    const form_data = new FormData(e.target);

    const data = {
      name: form_data.get('name'),
      picture: form_data.get('picture'),
      location: form_data.get('location'),
      email: form_data.get('email'),
      password: form_data.get('password')
    };

    await axios.post('http://localhost:5001/auth/signup', data,{
      headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(res => {
        setRegister(false); // Switch to login form after successful registration
      })
      .catch(err => {
        setEmailError(err.response.data.message || "Email ID already in use.");
      });
    
    setLoading("Submit");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading('Loading...');
    const form_data = new FormData(e.target);

    const data = {
      email: form_data.get('email'),
      password: form_data.get('password')
    };
    console.log(data);

    await axios.post("http://localhost:5001/auth/login", data)
      .then(res => {
        localStorage.setItem('token',res.data.token);
        navigate('/home'); 
      })
      .catch(err => {
        setLoginError(err.response.data.message || "Incorrect Email or Password");
      });

    setLoading("Submit");
  };

  return (
    <div className='formContainer'>
      <div className='formBtn'>
        <button className={isRegister ? "in_active" : "active"} onClick={() => setRegister(false)}>Sign In</button>
        <button className={!isRegister ? "in_active" : "active"} onClick={() => setRegister(true)}>Sign Up</button>
      </div>
      
      {isRegister && (
        <form className='form' onSubmit={handleRegister}>
          <label htmlFor='name' name='name'>Name</label>
          <input type='text' placeholder='Enter your name' name='name' required />

          <label htmlFor='name'>Picture</label>
          <input type='file' name='picture' required />

          <label htmlFor='location' name='location'>location</label>
          <input type='text' placeholder='location' name='location' required />

          <label htmlFor='email' name='email'>Email</label>
          <input type='text' placeholder='Enter your email id' name='email' required />

          {emailError && (
            <span className='error-message'>{emailError}</span>
          )}

          <label htmlFor='password' name='password'>Password</label>
          <input type='password' placeholder='Enter the password' name='password' required />

          <input type='submit' className='button' value={loading} />
        </form>
      )}
      {!isRegister && (
        <form className='form' onSubmit={handleLogin}>
          <label htmlFor='email' name='email'>Email</label>
          <input type='text' placeholder='Enter your email id' name='email' required />

          <label htmlFor='password' name='password'>Password</label>
          <input type='password' placeholder='Enter the password' name='password' required />

          {loginError && (
            <span className='error-message'>{loginError}</span>
          )}
          <input type='submit' className='button' value={loading} />
        </form>
      )}
    </div>
  );
}
