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
      {/* 1. TOP SECTION */}
      {/* Added 'relative' here so the absolute fade element stays pinned to this container */}
      <div className="relative w-full bg-[url('/bg4.png')] bg-cover bg-bottom bg-no-repeat">
        <div className="max-w-6xl mx-auto min-h-screen">
          <Navbar />
          <Hero />
        </div>
        
        {/* THE FADE EFFECT: Placed at the very bottom of this wrapper */}
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* 2. MIDDLE SECTION: Standard background (no image) for the next components */}
      <div className="max-w-6xl mx-auto">
        <UseFullSection />
        <Problem />
      </div>

      {/* 3. REST OF THE PAGE */}
      <Powerful />
      <div className='mt-36 text-3xl bg-neutral-100 w-full'>
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