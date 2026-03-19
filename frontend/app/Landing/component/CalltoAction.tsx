import React from 'react'

const CalltoAction = () => {
  return (
    <div className='flex flex-col gap-4 items-center text-center py-24 bg-zinc-100'>
        <h1 className='text-3xl'>Stop losing valuable knowledge.</h1>
        <p className='max-w-sm'>Turn your bookmarks into a searchable personal knowledge system.</p>
        <button className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600'>
          Get Early Access
        </button>
    </div>
  )
}

export default CalltoAction