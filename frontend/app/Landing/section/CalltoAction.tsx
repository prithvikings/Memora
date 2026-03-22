import React from 'react'

const CalltoAction = () => {
  return (
    // 'min-h-[70vh]' ensures the background image has enough room to breathe
    <div className="relative flex flex-col items-center justify-center w-full min-h-[70vh] py-32 bg-[url('/footerbg.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
        
        {/* THE VIGNETTE: Fades from your footer color (#1C1C1C) up to transparent */}
        <div className="absolute bottom-0 left-0 w-full h-4/5 bg-linear-to-t from-[#1C1C1C] via-[#1C1C1C]/80 to-transparent pointer-events-none"></div>

        {/* WRAPPER: relative z-10 ensures content stays above the vignette */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
            
            {/* Modern Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-medium mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Accepting Early Access
            </div>

            {/* Upgraded Typography */}
            <h1 className='text-4xl md:text-6xl font-instrument font-medium text-white tracking-tight max-w-3xl leading-tight'>
              Stop losing valuable knowledge.
            </h1>
            
            <p className='mt-6 text-base md:text-lg text-neutral-300 max-w-xl mx-auto'>
              Turn your chaotic bookmarks into a beautifully organized, AI-searchable personal knowledge system.
            </p>
            
            {/* Upgraded Button with Icon Hover Effect */}
            <div className="mt-10">
              <button className='group flex items-center cursor-pointer gap-2 bg-white text-black py-3 px-8 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 hover:bg-neutral-100 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]'>
                Get Early Access
                {/* SVG Arrow that slides right on hover */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
            
        </div>
    </div>
  )
}

export default CalltoAction;