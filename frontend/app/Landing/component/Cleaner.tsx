import React from 'react'

const Cleaner = () => {
  return (
    <div className='py-8 pt-16 max-w-6xl mx-auto flex flex-col gap-8'>
      
      <h1 className='text-center text-4xl'>A cleaner way to manage knowledge</h1>
      <div className='w-full bg-zinc-200 h-[600px] rounded-md'></div>
      <div className='flex items-center justify-around text-sm text-gray-500'>
        <p>Bookmark card with summary</p>
        <p>Tag system</p>
        <p>Search UI</p>
        <p>Collections dashboard</p>
      </div>
    </div>
  )
}

export default Cleaner