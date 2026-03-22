"use client";
import React from 'react';
import { motion, Variants } from 'motion/react';

const Navbar = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1, 
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: customEase },
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -15, 
      filter: "blur(4px)" 
    },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: customEase } 
    },
  };

  return (
    <motion.div 
      className="py-4 pt-6 flex items-center justify-between"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <motion.div variants={itemVariants} className="logo font-gist">
        <h1 className='text-2xl font-medium text-white'>Memora</h1>
      </motion.div>

      <motion.div variants={itemVariants} className='links flex items-center gap-8 font-light text-sm text-white'>
        <h1 className="cursor-pointer hover:opacity-80 transition-opacity">Product</h1>
        <h1 className="cursor-pointer hover:opacity-80 transition-opacity">Features</h1>
        <h1 className="cursor-pointer hover:opacity-80 transition-opacity">Use Cases</h1>
        <h1 className="cursor-pointer hover:opacity-80 transition-opacity">Pricing</h1>
        <h1 className="cursor-pointer hover:opacity-80 transition-opacity">Blog</h1>
      </motion.div>

      <motion.div variants={itemVariants}>
        <button className='text-sm px-4 py-2 bg-white rounded-full text-black font-medium hover:scale-105 transition-transform duration-300'>
          Get Started
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;