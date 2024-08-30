import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate ,useLocation} from 'react-router-dom';

// importing css
import './index.css'

export default function Index() {
  const [UserDetails,setUserDetails] = useState({});
  const navigate = useNavigate();
  // const location = useLocation();

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

      else
      {
        // if(location.pathname !== '/news/sharedPost/:postId')
          navigate('/');
      }
    };

    fetchUsername();


  }, [navigate]);

  if(!UserDetails)
  {
    return (
      <div className='user-profile'>
        <p>You have to Login boss</p>
      </div>
    )
  }
  
  return (
    <div className='user-profile'>
      <img src={`http://localhost:5001/public/assets/${UserDetails.picture}`} alt='profile'></img>
      <strong>{UserDetails.name}</strong>
      <span>Location : {UserDetails.location}</span>
    </div>
  )
}
