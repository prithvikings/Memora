"use client";
import React from "react";
import { motion, Variants } from "motion/react";

// Simplified to only the essentials
const footerLinks = [
  {
    title: "Product",
    links: [
      "Features",
      "Pricing",
      "Use Cases",
      "Browser Extension",
      "Changelog",
    ],
  },
  {
    title: "Resources",
    links: ["Help Center", "API Documentation", "Community", "Blog"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Privacy Policy", "Terms of Service"],
  },
];

const Footer = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } },
  };

  return (
    // Changed bg color to match the vignette from your CalltoAction section
    <footer className="bg-[#1C1C1C] text-[#A3A3A3] py-24 px-6 md:px-12 font-sans w-full border-t border-white/5">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col justify-between min-h-[50vh]"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Top Section: Huge Statement + Links */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-24">
          {/* 1. The Header Statement (Left Side) */}
          <motion.div variants={itemVariants} className="max-w-md">
            <h2 className="text-white font-instrument text-5xl md:text-6xl tracking-tight leading-tight">
              Your mind, <br /> beautifully organized.
            </h2>
          </motion.div>

          {/* 2. The Simplified Link Grid (Right Side) */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12"
          >
            {footerLinks.map((column, index) => (
              <div key={index} className="flex flex-col gap-5">
                <h3 className="text-white font-medium text-sm tracking-wide">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3. Bottom Section: Logo, Copyright, and Socials */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-end pt-8 border-t border-white/10 gap-6"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium text-white font-gist">
              Memora
            </h1>
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} Memora Inc. All rights reserved.
            </p>
          </div>

          {/* Minimalist Social Icons */}
          <div className="flex gap-4 items-center text-neutral-500">
            {/* Twitter / X */}
            <a
              href="#"
              className="hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="#"
              className="hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
