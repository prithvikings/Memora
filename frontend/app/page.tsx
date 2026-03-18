import React from 'react'
import Navbar from "./Landing/component/Navbar"
import Hero from "./Landing/component/Hero"
import Problem from "./Landing/component/Problem"
const page = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <Hero />
      <Problem />
    </div>
  )
}

export default page