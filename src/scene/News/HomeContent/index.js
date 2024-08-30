import React from 'react'

//  importing components
import Search from '../Search/Index'
import UploadPosts from '../Posts/Index'
import GetPost from '../getPosts/Index'
// Importing css
import './index.css'

export default function index() {
  return (
    <div className='home-content'>
      <div className='search-bar'>
        <Search></Search>
        <i className='bx bxs-bell'></i>
      </div>
      <span>Explore news</span>
      <UploadPosts></UploadPosts>
      <span>Latest news</span>
      <GetPost></GetPost>
    </div>
  )
}
