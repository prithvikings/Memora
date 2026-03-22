"use client";
import React from "react";
import { motion } from "framer-motion";
import Check from "../image/check";
import Tick from "../image/tick";

const Built = () => {
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
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: customEase } 
    },
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 md:px-0">
      
      {/* --- SECTION 1: THE GRID --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-poppins tracking-tight">
          Built for people <br />
          who live on the internet
        </motion.h1>

        {/* Added md:grid-cols-3 so it stacks nicely on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          
          {/* Top Row */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-neutral-50 border border-neutral-100 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-neutral-200 h-48 rounded-xl w-full"></div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-poppins text-neutral-800">Developers</h2>
              <p className="text-gray-500 text-sm">
                Save documentation, tools, tutorials, and references.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-neutral-50 border border-neutral-100 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-neutral-200 h-48 rounded-xl w-full"></div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-poppins text-neutral-800">Researchers</h2>
              <p className="text-gray-500 text-sm">
                Organize articles, studies, and resources in one place.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-neutral-50 border border-neutral-100 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-neutral-200 h-48 rounded-xl w-full"></div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-poppins text-neutral-800">Students</h2>
              <p className="text-gray-500 text-sm">
                Keep track of learning materials and study resources.
              </p>
            </div>
          </motion.div>

          {/* Bottom Row */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="md:col-span-2 bg-neutral-50 border border-neutral-100 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-neutral-200 h-48 rounded-xl w-full"></div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-poppins text-neutral-800">Founders</h2>
              <p className="text-gray-500 text-sm">
                Save startup insights, tools, and market research.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-neutral-50 border border-neutral-100 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-neutral-200 h-48 rounded-xl w-full"></div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-poppins text-neutral-800">Designers</h2>
              <p className="text-gray-500 text-sm">
                Store inspiration, UI references, and resources.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- SECTION 2: COMPARISON TABLE --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-36"
      >
        <motion.h1 variants={itemVariants} className="text-center text-4xl font-poppins tracking-tight">
          Better than traditional bookmarks
        </motion.h1>
        
        <div className="grid grid-cols-3 gap-4 mt-16 justify-items-center bg-white border border-neutral-100 shadow-sm rounded-3xl p-8 md:p-12">
          
          {/* Column 1: Features */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8 w-full">
            <h2 className="text-xl font-medium text-neutral-800 mb-2">Features</h2>
            <p className="text-base text-gray-600 font-medium h-6">AI summaries</p>
            <p className="text-base text-gray-600 font-medium h-6">Smart tagging</p>
            <p className="text-base text-gray-600 font-medium h-6">Natural search</p>
            <p className="text-base text-gray-600 font-medium h-6">Duplicate detection</p>
            <p className="text-base text-gray-600 font-medium h-6">Knowledge discovery</p>
          </motion.div>

          {/* Column 2: Browser */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8 items-center w-full bg-neutral-50 rounded-2xl py-4 -my-4">
            <h2 className="text-xl font-medium text-neutral-500 mb-2">Browser</h2>
            <div className="h-6 flex items-center"><Tick /></div>
            <div className="h-6 flex items-center"><Tick /></div>
            <div className="h-6 flex items-center"><Tick /></div>
            <div className="h-6 flex items-center"><Tick /></div>
            <div className="h-6 flex items-center"><Tick /></div>
          </motion.div>

          {/* Column 3: Memora */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8 items-center w-full bg-neutral-900 text-white rounded-2xl py-4 -my-4 shadow-lg">
            <h2 className="text-xl font-medium text-white mb-2 font-gist">Memora</h2>
            <div className="h-6 flex items-center"><Check /></div>
            <div className="h-6 flex items-center"><Check /></div>
            <div className="h-6 flex items-center"><Check /></div>
            <div className="h-6 flex items-center"><Check /></div>
            <div className="h-6 flex items-center"><Check /></div>
          </motion.div>

        </div>
      </motion.div>
      
    </div>
  );
};

export default Built;