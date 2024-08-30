import React from 'react';

import HomeContent from './HomeContent/index';
import Sidebar from './side/Index';
import RightSideBar from '../RightSideBar/index'
import './index.css';

export default function Index() {

  return (
    <div className='container'>
      <Sidebar></Sidebar>
      <HomeContent></HomeContent>
      <RightSideBar></RightSideBar>
    </div>
  );
}
