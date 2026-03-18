import React from 'react'

const Navbar = () => {
  return (
    <div className="py-4 flex items-center justify-between">
      <div className="logo font-gist">
        <h1 className='text-xl'>Memora</h1>
      </div>
      <div className='links flex items-center gap-8 font-light text-xs'>
        <h1>Product</h1>
        <h1>Features</h1>
        <h1>Use Cases</h1>
        <h1>Pricing</h1>
        <h1>Blog</h1>
      </div>
      <div>
        <button className='text-sm px-2 py-2 border border-b-zinc-800 border-x-zinc-200 border-t-zinc-200'>Get Started</button>
      </div>
    </div>
  )
}

export default Navbar