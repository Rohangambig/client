import React from 'react'
import { useNavigate } from 'react-router-dom';

import './index.css'
import RightSide from './RightSideBar/index'
import PostItem from './PostItem/Index';
import FooterComponent from '../sharedNews/FooterComponent/Index'

export default function Index() {
    const navigation = useNavigate();
  return (
    <div className='shared-post'>
      <nav className='shared-post-navigation'>
        <p id='products'>Product name</p>
        <ul className='nav-bar'>
            <li onClick={()=>{navigation('/news')}}>Home</li>
            <li onClick={()=>{navigation('/jobs')}}>Contact</li>
            <li onClick={()=>{navigation('/rooms')}}>About</li>
        </ul>
      </nav>
      <div className='shared-posts'>
        <PostItem></PostItem>
        <RightSide></RightSide>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  )
}
