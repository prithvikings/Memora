"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const customEase = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3, 
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      filter: "blur(4px)",
      transition: { duration: 0.4, ease: customEase },
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95,
      filter: "blur(8px)" 
    },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1, ease: customEase } 
    },
  };

  return (
    <div className='mx-auto max-w-6xl'>
      <div className='flex items-center gap-8 mt-32'>
        <motion.div 
          className='flex items-center justify-center flex-col max-w-4xl mx-auto space-y-2'
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <motion.h1 
            variants={itemVariants} 
            className='text-6xl font-instrument text-center leading-tight text-white max-w-2xl'
          >
            Turn Your Bookmarks Into an AI-Powered Knowledge Hub
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className='text-sm mt-2 text-gray-100 max-w-md text-center'
          >
            Save any webpage and let AI automatically summarize, organize, and make it searchable.
          </motion.p>

          <motion.div variants={itemVariants} className='flex items-center gap-4 mt-6'>
            <button className='px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform duration-300'>
              Start Saving Smarter
            </button>
            <button className='px-4 py-2 rounded-full text-white bg-white/15 hover:bg-white/25 font-medium text-sm transition-all duration-300 hover:scale-105'>
              Watch Demo
            </button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default Hero;