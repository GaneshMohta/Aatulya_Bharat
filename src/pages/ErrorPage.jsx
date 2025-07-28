import React from 'react'
import { Link } from 'react-router-dom'
import './front.css'

export default function ErrorPage() {
  return (
    <div className='flex text-center items-center flex-col justify-center h-[100vh] text-2xl '>
        <h1 className='text-3xl'> Page is Under Construction Sorry for inconvenience</h1>
                    <span className='cards-h1   '>📝</span>
                    <br />
        <h1 className='weddy-h1'>Wrong Link</h1>
        <Link to='/'  ><p className='cards-h1 cursor-pointer text-blue-400 hover:text-blue-600 duration-75'>Redirect</p></Link>
    </div>
  )
}
