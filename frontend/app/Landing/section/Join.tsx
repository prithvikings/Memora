"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Extract data into an array (Added 3 extra mock testimonials for the second page)
const testimonials = [
  {
    id: 1,
    quote:
      "What a fantastic tool Memora is, I just love it. It has completely transformed how I organize my thoughts.",
    name: "Manu Arora",
    role: "Tech Innovator & Entrepreneur",
    avatar: "https://assets.aceternity.com/avatars/manu.webp",
  },
  {
    id: 2,
    quote:
      "I saved a book with the help of AI, it was so easy to use. Highly recommend it to anyone looking to learn.",
    name: "Tyler Durden",
    role: "Creative Director & Business Owner",
    avatar: "https://assets.aceternity.com/avatars/1.webp",
  },
  {
    id: 3,
    quote:
      "Memora has transformed the way I work! It's like having a brilliant brain that knows what I need. ",
    name: "Alice Johnson",
    role: "Senior Software Engineer",
    avatar: "https://assets.aceternity.com/avatars/2.webp",
  },
  {
    id: 4,
    quote:
      "The knowledge system saved us countless hours. Highly intuitive and beautifully designed tool. ",
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "https://assets.aceternity.com/avatars/8.webp",
  },
  {
    id: 5,
    quote:
      "The interface is stunning. It feels like magic every time I use it. Best tool in our stack.",
    name: "David Kim",
    role: "UX Designer",
    avatar: "https://assets.aceternity.com/avatars/3.webp",
  },
  {
    id: 6,
    quote:
      "Organizes ideas faster than I ever could manually. A total game changer for my daily workflow.",
    name: "Emily Davis",
    role: "Content Creator",
    avatar: "https://assets.aceternity.com/avatars/4.webp",
  },
];

const Join = () => {
  // 2. Add State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  // Handlers for navigation (Loops back around when reaching the end)
  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get the 3 testimonials for the current page
  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-24 pt-12 md:px-0">
      <div className="flex w-full flex-col items-start gap-4">
        <p className="font-mono text-lg tracking-wide text-neutral-900">
          Testimonials
        </p>

        {/* Heading and Navigation Arrows */}
        <div className="flex w-full items-center justify-between">
          <h1 className="font-poppins text-4xl font-medium text-zinc-800 md:text-5xl">
            People love us, you know.
          </h1>
          <div className="hidden items-center gap-3 md:flex">
            {/* Back Button */}
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 active:scale-95"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            {/* Forward Button */}
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 active:scale-95"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonial Cards Grid wrapped in AnimatePresence */}
        <div className="relative mt-8 w-full">
          {/* mode="wait" ensures the old cards fade out before the new ones fade in */}
          <AnimatePresence mode="wait">
            <motion.div
              // The key forces React/Framer Motion to treat this as a completely new element when the page changes
              key={currentPage}
              // 3. The entry/exit blur animation states
              initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid w-full grid-cols-1 gap-4 md:grid-cols-3"
            >
              {currentTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md min-h-[300px]"
                >
                  <h3 className="font-sans text-xl tracking-tight text-neutral-700">
                    {testimonial.quote}
                  </h3>
                  <div className="mt-12 flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-neutral-900">
                        {testimonial.name}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Join;
