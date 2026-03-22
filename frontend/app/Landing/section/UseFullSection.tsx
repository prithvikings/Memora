"use client";
import React from "react";
import { motion } from "motion/react";
import { Usefullcard } from "../component/Usefullcard";

const UseFullSection = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }} // Triggers when 100px away from view
        transition={{ duration: 0.8, ease: customEase }}
      >
        <h1 className="text-5xl font-poppins mt-28 font-medium text-zinc-800 tracking-tight">
          Your bookmarks. <br />
          Finally useful.
        </h1>
      </motion.div>
      <Usefullcard />
    </>
  );
};

export default UseFullSection;
