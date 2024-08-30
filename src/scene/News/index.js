import HomeContent from './HomeContent/index'
import Sidebar from '../Home/side/Index';
import RightSideBar from '../RightSideBar/index';
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

// { <nav className='nav'>
//   <Navigate />
// </nav>
// <div className='search'>
//   <Search></Search>
// </div>}