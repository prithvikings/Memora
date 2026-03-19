import React from 'react'
import { Cards } from './Cards'

const Problem = () => {
  return (
    <div className='mt-18'>
      <div className='bg-red-200 px-1.5 py-1 w-fit border-2  border-red-500 text-red-600'>
        <p className='text-sm font-normal'>Problem</p>
        
      </div>
      <h1 className='text-4xl mt-4'>Bookmarks are broken.</h1>
      <p className='text-sm text-gray-600 mt-2'>Bookmarks are a mess. They’re hard to organize, hard to find, and hard to use.</p>
      <div className='mt-44'>
        <Cards />
      </div>
    </div>
  )
}

export default Problem