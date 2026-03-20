"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Cards } from './Cards'; // Assuming your Cards component is exported from here

const Problem = () => {
  const customEase = [0.22, 1, 0.36, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: customEase } 
    },
  };

  return (
    <motion.div 
      className='mt-18'
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={itemVariants} className='bg-red-200 px-1.5 py-1 w-fit border-2 border-red-500 text-red-600'>
        <p className='text-sm font-normal'>Problem</p>
      </motion.div>
      
      <motion.h1 variants={itemVariants} className='text-5xl mt-4'>
        Bookmarks are broken.
      </motion.h1>
      
      <motion.p variants={itemVariants} className='text-sm text-gray-600 mt-2'>
        Bookmarks are a mess. They’re hard to organize, hard to find, and hard to use.
      </motion.p>
      
      <motion.div 
        variants={itemVariants} 
        className='mt-44'
      >
        <Cards />
      </motion.div>
    </motion.div>
  )
}

export default Problem;