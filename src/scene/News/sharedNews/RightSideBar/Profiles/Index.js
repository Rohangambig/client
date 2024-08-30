import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// importing css
import './index.css'

export default function Index() {
  const [UserDetails,setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token');
      
      
      if (token) {
        try {
          const response = await axios.get('http://localhost:5001/auth/userinfo', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.user);
          setUserDetails(response.data.user);
        } catch (error) {
          console.error('Error fetching username:', error);
          navigate('/');
        }
      }
    };

    fetchUsername();


  }, [navigate]);

  if(!UserDetails)
  {
    return (
      <div className='not-user-login' onClick={()=>{ navigate('/') }}>
        <span>Login</span>
      </div>
    )
  }
  
  else
  {
    return (
      <div className='user-profile' >
        <img src={`http://localhost:5001/public/assets/${UserDetails.picture}`} alt='profile'></img>
        <strong>{UserDetails.name}</strong>
        <span>Location : {UserDetails.location}</span>
      </div>
    )
  }
}
