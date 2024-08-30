import React from 'react'

// importing component
import Ads from './Ads/index'
import Profiles from './Profiles/Index.js'

// Importing css
import './index.css'

export default function index() {
  return (
    <div className='profile-bar'>
       <Profiles></Profiles> 
    </div>
  )
}
