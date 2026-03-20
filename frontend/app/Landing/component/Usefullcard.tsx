"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const Usefullcard  = () => {
  const [items, setItems] = useState<Component[]>(COMPONENTS);
  const [active, setActive] = useState<Component | null>(null);

 
  return (
    <section className="max-w-6xl mx-auto mt-12">
    
      {/* active item */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 w-full h-full bg-black/5 backdrop-blur-lg z-50 flex items-center justify-center"
        >
          <motion.div
            layoutId={`component-${active.title}`}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="w-80 h-100 rounded-md bg-white shadow-sm border border-transparent shadow-black/10 ring-1 ring-black/5 p-4 flex flex-col z-100"
          >
            <div className="flex flex-col  flex-1 justify-between">
              <div>
                <motion.div layoutId={`component-image-${active.title}`}>
                  <Image
                    src={active.src}
                    alt={active.title}
                    width={500}
                    height={500}
                    className="w-full  h-40 rounded-sm shadow-lg object-cover"
                  />
                </motion.div>
                <motion.h2
                  layoutId={`component-title-${active.title}`}
                  className="text-lg font-medium mt-2 text-neutral-600 text-shadow-sm text-shadow-black/5"
                >
                  {active.title}
                </motion.h2>
                <motion.p
                  layoutId={`component-description-${active.title}`}
                  className="text-lg text-neutral-500 mt-2"
                >
                  {active.description}
                </motion.p>
              </div>
              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag, index) => (
                  <div
                    key={tag}
                    className="text-xs px-1 py-0.5 rounded-md border border-neutral-100 bg-neutral-50"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <div className="grid grid-cols-3 gap-10">
        {items.map((item, index) => (
          <motion.button
            key={item.title}
            onClick={() => setActive(item)}
            layoutId={`component-${item.title}`}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={cn(
              "group text-left h-full flex flex-col z-10 bg-neutral-100 p-4 pb-8 rounded-2xl shadow-sm border border-transparent shadow-black/10 ring-1 ring-black/5",
              active?.title === item.title && "z-50"
            )}
          >
            <motion.div
              layoutId={`component-image-${item.title}`}
              className="relative overflow-hidden rounded-sm cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                width={500}
                height={500}
                className="h-72 w-full rounded-sm object-cover group-hover:scale-105 transition-all duration-200"
              />
            </motion.div>
            <motion.h2
              layoutId={`component-title-${item.title}`}
              className="text-lg font-medium mt-2 text-neutral-600 text-shadow-sm text-shadow-black/5"
            >
              {item.title}
            </motion.h2>
            <motion.p
              layoutId={`component-description-${item.title}`}
              className="text-xs text-neutral-500 mt-2"
            >
              {item.description}
            </motion.p>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

type Component = {
  id: number;
  title: string;
  description: string;
  src: string;
  tags: string[];
};

const COMPONENTS: Component[] = [
  {
    id: 18,
    title: "Step 1",
    description:
      "Easily save any content with our fast browser extension.",
    src: "https://assets.aceternity.com/canvas-reveal-effect.png",
    tags: ["background", "hover", "animation", "dots", "reveal"],
  },
  {
    id: 2,
    title: "Step 2",
    description:
      "Our AI engine analyzes saved links instantly. It extracts key details, writes a short summary, and adds smart tags.",
    src: "https://assets.aceternity.com/cloudinary_bkp/3d_pin_sklefs.png",
    tags: ["3d", "animation", "pin", "gradient", "hover", "product"],
  },
  {
    id: 3,
    title: "Step 3",
    description:
      "Find anything instantly using natural language search in your knowledge base.",
    src: "https://assets.aceternity.com/code-block.webp",
    tags: ["code", "syntax", "highlighting", "block", "developer"],
  },
];