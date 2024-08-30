import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

export default function index() {
  const [username, setUsername] = useState('');
  const [isShowLogin,ShowLogin] = useState(false);
  const navigate  = useNavigate();

  const DeleteUserToken  = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className='nav-container'>
      <span className='heading'>Music</span>
      
      <i class='bx bx-menu' id='menu' onClick={()=>{isShowLogin ? ShowLogin(false) : ShowLogin(true)}}></i>
          { isShowLogin && (
            
              <div className='UserResponsive'>
                <span class='bx bx-x' id='close' onClick={()=>{isShowLogin ? ShowLogin(false) : ShowLogin(true)}} ></span>
                
                <div className='UserDetails'>
                  <h4 style={{'color':'white'}}>{username}</h4>
                </div>
                
                <ul className='lists'>
                  <li>Home</li>
                  <li>About</li>
                  <li>Contact</li>
                  <li id='logout' onClick={DeleteUserToken}>Logout</li>
                </ul>
              </div>
          )}
    </nav>
  );
}
