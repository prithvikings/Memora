import React from 'react'
import Navbar from "./Landing/component/Navbar"
import Hero from "./Landing/component/Hero"
import UseFullSection from "./Landing/component/UseFullSection"
import Problem from "./Landing/component/Problem"
import Solution from './Landing/component/Solution'
import Powerful from './Landing/component/Powerful'
import Cleaner from './Landing/component/Cleaner'
import Built from './Landing/component/Built'
import Join from './Landing/component/Join'
import CalltoAction from './Landing/component/CalltoAction'
import Footer from './Landing/component/Footer'

const page = () => {
  return (
    <>
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <Hero />
      <UseFullSection />
      <Problem />
      
      
    </div>
    {/* <div className='mt-4 text-3xl bg-neutral-100 w-full'>
      <Solution />
    </div> */}
    <Powerful />
    <div className='mt-4 text-3xl bg-neutral-100 w-full'>
      <Cleaner />
    </div>
    <Built />
    <Join />
    <CalltoAction />
    <div className='bg-[#1C1C1C]'>
    <Footer />
      
    </div>
      </>

  )
}

export default page