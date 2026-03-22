"use client";
import React from "react";
import { motion } from "framer-motion";

// Make sure your filenames match these imports! 
// If your files are lowercase, just alias them with uppercase here:
import Scroll from "../image/scroll";
import Sparkles from "../image/sparkles";
import Brain from "../image/brain";
import HighVoltage from "../image/highvoltage";
import Magnifying from "../image/magnifying";

// 1. CHANGED: icon is now React.ReactNode so it accepts components, not just strings
const Pill = ({ 
  children, 
  icon, 
  colorClass, 
  rotateClass 
}: { 
  children: React.ReactNode, 
  icon: React.ReactNode, 
  colorClass: string, 
  rotateClass: string 
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className={`inline-flex items-center justify-center gap-1.5 py-0.5 px-4 mx-1 border-2 rounded-full shadow-sm cursor-default transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-md ${rotateClass} ${colorClass}`}
    >
      {/* 2. Added flex shrink-0 so the image doesn't get squished by long text */}
      <span className="flex items-center justify-center shrink-0">{icon}</span>
      <span className="font-semibold tracking-wide">{children}</span>
    </motion.span>
  );
};

export const Solution = () => {
  return (
    <div className="max-w-5xl mx-auto py-32 px-6 flex flex-col items-center text-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-neutral-100 px-4 py-1.5 w-fit rounded-full border border-neutral-200 text-neutral-600 mb-10 shadow-sm"
      >
        <p className="text-xs font-semibold tracking-widest uppercase">The Shift</p>
      </motion.div>

      <p className="text-3xl md:text-5xl text-neutral-800 font-medium leading-[2.2] md:leading-[2]">
        Stop losing your best ideas in a chaotic mess of 
        
        {/* 3. Passing the components correctly using JSX syntax */}
        <Pill 
          icon={<Scroll />} 
          rotateClass="-rotate-3" 
          colorClass="bg-orange-50 border-orange-200 text-orange-700"
        >
          open tabs
        </Pill> 
        
        and forgotten links. It's time to turn your browser into a beautifully 
        
        <Pill 
          icon={<Sparkles />} 
          rotateClass="rotate-2" 
          colorClass="bg-purple-50 border-purple-200 text-purple-700"
        >
          curated
        </Pill> 
        
        and deeply 
        
        <Pill 
          icon={<Magnifying />} 
          rotateClass="-rotate-2" 
          colorClass="bg-blue-50 border-blue-200 text-blue-700"
        >
          searchable
        </Pill> 
        
        knowledge base. Our AI automatically 
        
        <Pill 
          icon={<Brain />} 
          rotateClass="rotate-3" 
          colorClass="bg-emerald-50 border-emerald-200 text-emerald-700"
        >
          reads
        </Pill> 
        
        the page, extracts the context, and 
        
        <Pill 
          icon={<HighVoltage />} 
          rotateClass="-rotate-2" 
          colorClass="bg-rose-50 border-rose-200 text-rose-700"
        >
          connects
        </Pill> 
        
        your thoughts instantly.
      </p>
    </div>
  );
};

export default Solution;