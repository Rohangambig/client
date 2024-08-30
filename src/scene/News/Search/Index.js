import React from 'react'


import './index.css'

export default function Index() {
  return (
    <form className='search-container'>
        <input type='text' placeholder='Enter the place'></input>
        <button type='submit'>Search</button>
    </form>
  )
}
