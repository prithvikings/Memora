"use client";
import React from 'react';
import { motion, Variants } from 'motion/react';

const Join = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: customEase } 
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.98, filter: "blur(8px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: customEase } 
    },
  };

  return (
    <div className='max-w-6xl mx-auto py-24 px-4 md:px-0'>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className='flex flex-col gap-3'
      >
        <motion.h1 
          variants={itemVariants} 
          className='text-center text-4xl md:text-5xl font-poppins tracking-tight text-neutral-800'
        >
          Start turning your chaotic folders into AI memory
        </motion.h1>
        
        <motion.p 
          variants={itemVariants} 
          className='text-center text-gray-500 font-medium'
        >
          <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-md mr-1">2,000+</span> 
          creators on the waitlist
        </motion.p>

        {/* The Testimonial Card */}
        <motion.div 
          variants={cardVariants}
          className='mt-16 flex flex-col md:flex-row w-full rounded-3xl overflow-hidden shadow-sm border border-neutral-100'
        >
          {/* Left Side: The Quote */}
          <div className='w-full md:w-1/2 bg-neutral-50 h-auto md:h-[450px] flex items-center justify-center p-8 md:p-16'>
            <div className='flex flex-col gap-8'>
              
              {/* Subtle Quote Mark Icon */}
              <svg className="w-10 h-10 text-neutral-300 mb-[-10px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <h1 className='text-2xl md:text-3xl font-medium leading-snug text-neutral-800'>
                "This AI bookmark platform is a complete game changer. Instead of losing my links in messy folders, everything is neatly organized."
              </h1>
              
              <div className='flex flex-col mt-4'>
                <p className='text-neutral-800 font-semibold'>Elena Rodriguez</p>
                <p className='text-sm text-gray-500'>Senior Engineer, GitHub (Pro User)</p>
              </div>
            </div>
          </div>
          
          {/* Right Side: The Image/Placeholder */}
          <div className='w-full md:w-1/2 bg-neutral-200 h-64 md:h-[450px] relative'>
            {/* You can drop a Next.js <Image /> component in here later */}
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default Join;