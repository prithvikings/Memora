"use client";
import React from "react";

const footerLinks = [
  {
    title: "Feature",
    links: ["Upgrade", "Web app", "AI search", "AI engine", "Smart duplicate finder", "Smart tagging", "Save links", "Browser extension"],
  },
  {
    title: "Knowledge",
    links: ["Blog", "Help", "Release", "Help guides", "Data privacy", "API", "Use cases", "For devs", "Creators", "User reviews"],
  },
  {
    title: "Community",
    links: ["Forums", "Support"],
  },
  {
    title: "Compare",
    links: ["VS Folders", "VS Browser"],
  },
  {
    title: "Download",
    links: ["Mobile app", "Desktop app", "Chrome ext"],
  },
  {
    title: "Business",
    links: ["Work plan", "SSO", "API"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "For founders", "For media", "Terms of service", "Privacy policy", "Manage cookies"],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[#1C1C1C] text-[#A3A3A3] py-20 px-6 font-sans max-w-6xl mx-auto">
      <div className="max-w-[1400px] mx-auto">
        
        {/* 1. The Header Statement */}
        <div className="mb-20">
          <h2 className="text-white font-serif italic text-4xl md:text-4xl tracking-wide">
            Find it faster, <br /> never lose a link.
          </h2>
        </div>

        {/* 2. The 7-Column Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-12 mb-20">
          {footerLinks.map((column, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="text-white font-semibold text-sm tracking-wide">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-xs hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Bottom Section: Socials & Language */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8 border-b border-neutral-800 gap-6">
          {/* Social Icons */}
          <div className="flex gap-6 items-center text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors font-bold text-lg leading-none">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.63-.31 3.26-1.15 4.67-1.41 2.37-4.14 3.86-6.9 3.96-2.7.1-5.46-.88-7.23-2.92-2.11-2.42-2.6-6.04-1.14-8.88 1.2-2.33 3.73-3.89 6.35-3.92v4.06c-1.25.1-2.43.83-3.08 1.9-.92 1.54-.7 3.65.55 4.96 1.09 1.14 2.8 1.46 4.23.85 1.55-.66 2.5-2.32 2.5-4.01V.02z"/></svg>
            </a>
          </div>

          {/* Language Selector */}
          <button className="flex items-center gap-2 border border-neutral-700 rounded-full px-4 py-2 hover:bg-neutral-800 transition-colors text-sm text-white">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" /><path d="M2 12H22" /><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" /></svg>
            English
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        {/* 4. Deep Footer: Copyright & Meta Logo */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm gap-4">
          <div className="flex items-center gap-2 text-white font-medium tracking-wide">
            <span className="text-neutral-400 font-normal">from</span>
            {/* Meta Infinity Logo */}
            <svg width="60" height="20" viewBox="0 0 100 20" fill="currentColor">
              <path d="M29.8 1.3C26.1 1.3 22.8 2.9 20 5.4 17.2 2.9 13.9 1.3 10.2 1.3 4.6 1.3 0 5.8 0 11.4c0 5.5 4.6 10 10.2 10 3.8 0 7.2-1.7 10-4.3 2.8 2.6 6.2 4.3 10 4.3 5.5 0 10.1-4.5 10.1-10 0-5.6-4.6-10.1-10.5-10.1zM10.2 18.5c-3.9 0-7.2-3.2-7.2-7.1s3.2-7.1 7.2-7.1c3.2 0 6.1 1.9 7.4 4.8l2.5 5c-1.3 2.6-4.1 4.4-7.4 4.4zm19.6 0c-3.2 0-6.1-1.8-7.4-4.4l-2.5-5c1.3-2.9 4.2-4.8 7.4-4.8 3.9 0 7.2 3.2 7.2 7.1s-3.3 7.1-7.2 7.1z"/>
              <text x="45" y="16" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Base</text>
            </svg>
          </div>
          <p className="text-sm text-neutral-500">
            © 2026 Base
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;