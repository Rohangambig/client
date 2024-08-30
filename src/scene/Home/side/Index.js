import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Importing css
import './index.css'

export default function Index() {

  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

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
    <div className='side-bar'>
        <div className='side-bar-container'>
            <span id='product-name'>Local News</span>
            <div className='slide-bar-list'>
                <li className={location.pathname === '/news'?'active':""} onClick={()=>{handleNavigation(1)}}>Home</li>
                <li className={location.pathname === '/jobs'?'active':""} onClick={()=>{handleNavigation(3)}}>Contact</li>
                <li className={location.pathname === '/tolet'?'active':""} onClick={()=>{handleNavigation(4)}}>About</li>
            </div>
        </div>
        
      <span id='logout' onClick={handleLogout}>Logout</span>

    </div>
  )
}
