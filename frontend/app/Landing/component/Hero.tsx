import React from 'react'

const Hero = () => {
  return (
    <div className='mx-auto max-w-6xl'>
      <div className='flex items-center gap-8 mt-32'>
        <div className='flex items-center justify-center flex-col max-w-4xl mx-auto space-y-2'>
          <h1 className='text-5xl font-bold text-center leading-tight'>Turn Your Bookmarks Into an <br />AI-Powered Knowledge Hub</h1>
          <p className='text-sm mt-4 text-gray-600 max-w-lg text-center'>Save any webpage and let AI automatically summarize, organize, and make it searchable.</p>
          <div className='flex items-center gap-4'>
          <button className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-md'>Start Saving Smarter</button>
          <button className='mt-6 px-4 py-2 border-2 border-zinc-400 text-blue-500 rounded-md'>Watch Demo</button>
          </div>
          <div className='text-zinc-400 text-xs flex items-center gap-4 mt-4'>
            <p>No credit card required</p>
            <p>Free browser extension</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero