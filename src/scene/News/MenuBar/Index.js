import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Index() {
  const [menu, setMenu] = useState('bx-plus');
  const [isClicked,setisClicked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [UserDetails,setUserDetails] = useState({});


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

  const HandleMenus = () => {
    setMenu(menu === 'bx-x' ? 'bx-plus' : 'bx-x');
    setisClicked(isClicked === true ? false:true);
  };

  const handleNavigation = (index) => {
    if(index === 1)
      navigate('/home');

    else if(index === 2)
      navigate('/news');

    else if(index === 3)
      navigate('/jobs');

    else if(index === 4)
      navigate('/rooms');

  }

  return (
    <div className='menubar'>
      <i className={`bx ${menu}`} onClick={HandleMenus}></i>

      {isClicked &&(
        <div className='menus'>
          <div className='mobile-user-menu'>

          <div className='user-profile-menus'>
            <img src={`http://localhost:5001/public/assets/${UserDetails.picture}`} alt='profile'></img>
            <strong>{UserDetails.name}</strong>
          </div>
          <ul style={{'width':'100%'}}>
          <li className={location.pathname === '/news'? 'active':""} onClick={()=>{handleNavigation(2)}}>Home</li>
          <li className={location.pathname === '/about'?'active':""} onClick={()=>{handleNavigation(4)}}>About</li>
          <li className={location.pathname === '/contact'?'active':""} onClick={()=>{handleNavigation(5)}}>Contact</li>
          <li className={location.pathname === '/'?'active':""} onClick={()=>{navigate('/')}}>Logout</li>
          </ul>
           </div>
        </div>
      )}
    </div>
  );
}
