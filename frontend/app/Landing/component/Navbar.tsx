import React from 'react'

const Navbar = () => {
  return (
    <div className="py-4 pt-6 flex items-center justify-between">
      <div className="logo font-gist">
        <h1 className='text-2xl font-medium text-white'>Memora</h1>
      </div>
      <div className='links flex items-center gap-8 font-light text-sm text-white'>
        <h1>Product</h1>
        <h1>Features</h1>
        <h1>Use Cases</h1>
        <h1>Pricing</h1>
        <h1>Blog</h1>
      </div>
      <div>
        <button className='text-sm px-3 py-2 bg-white rounded-full text-black'>Get Started</button>
      </div>
    </div>
  )
}

export default Navbar