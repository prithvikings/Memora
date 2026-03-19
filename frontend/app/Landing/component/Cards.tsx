"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

type Card = {
    title: string;
    description: string;
    skeleton: React.ReactNode;
    className: string;
    config: {
        y: number;
        zIndex: number;
        x?: number;
        rotate?: number;
    };
};

export const Cards = () => {
    // Re-applied the Minimalist Sky palette and adjusted skeleton heights
    

const cards = [
        {
            title: "One-Click Capture",
            description:
                "Quickly save any link or articles into your smart and personal AI-powered library.",
            skeleton: <div className="h-36 w-full rounded-xl bg-gradient-to-r from-orange-600 to-orange-600/40"></div>,
            className: "bg-orange-500 [&_h2]:text-white",
            config: {
                y: -20,
                x: 0,
                rotate: -15,
                zIndex: 2,
            },
        },

        {
            title: "Automated AI Processing",
            description:
                "The system will automatically extract summaries and apply smart tags.",
            skeleton: <div className="h-36 w-full rounded-xl bg-gradient-to-r from-neutral-300 to-neutral-400/40"></div>,
            className: "bg-stone-200 [&_p]:text-black",
            config: {
                y: 20,
                x: 180,
                rotate: 8,
                zIndex: 3,
            },
        },
        {
            title: "Intelligent Queries",
            description:
                "Search your knowledge hub instantly using natural language questions.",
            skeleton: <div className="h-36 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-600/40"></div>,
            className: "bg-blue-500 [&_h2]:text-white",
            config: {
                y: -80,
                x: 360,
                rotate: -5,
                zIndex: 4,
            },
        },
        {
            title: "Smart Groupings",
            description:
                "Group all of your saved articles perfectly into custom folders.",
            skeleton: <div className="h-36 w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-600/40"></div>,
            className: "bg-purple-500 [&_h2]:text-white",
            config: {
                y: 20,
                x: 540,
                rotate: 12,
                zIndex: 5,
            },
        },
        {
            title: "Link Explorer",
            description:
                "Automatically track all your duplicate links and web content.",
            skeleton: <div className="h-36 w-full rounded-xl bg-gradient-to-r from-neutral-950 to-neutral-950/40"></div>,
            className: "bg-neutral-900 [&_h2]:text-white",
            config: {
                y: 20,
                x: 720,
                rotate: -5,
                zIndex: 6,
            },
        },
    ];

    const [active, setActive] = useState<Card | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    // Maintained the bug fixes for closing the card
    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (!ref.current) return;

            const isOutsideContainer = !ref.current.contains(event.target as Node);
            const targetElement = event.target as HTMLElement;
            const clickedOnCard = targetElement.closest("button");

            if (isOutsideContainer || !clickedOnCard) {
                setActive(null);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActive(null);
            }
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keydown", handleKeyDown);
        
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const isAnyCardActive = () => {
        return active?.title;
    };

    const isCurrentActive = (card: Card) => {
        return active?.title === card.title;
    };

    return (
        <motion.div ref={ref} className="max-w-5xl mx-auto w-full h-160 relative">
            {cards.map((card, index) => (
                <motion.div key={card.title}>
                    <motion.button
    initial={{
        y: 400,
        x: 0,
        scale: 0,
    }}
    onClick={() => {
        setActive(card);
    }}
    animate={{
    // 1. Y-AXIS: Lift active card UP (-40px), push background cards DOWN (280px)
    y: isCurrentActive(card) ? -40 : (isAnyCardActive() ? 230 : card.config.y),
    
    // 2. X-AXIS: Keeps the same centered fan math from before
    x: isCurrentActive(card) 
        ? 340 
        : (isAnyCardActive() ? 370 + ((card.config.x ?? 0) - 360) * 0.3 : card.config.x),
    
    // 3. ROTATION: Keeps the subtle fan
    rotate: isCurrentActive(card) 
        ? 0 
        : (isAnyCardActive() ? 0.4 * (card.config.rotate ?? 0) : card.config.rotate),
    
    // 4. SCALE: Shrinks background cards slightly
    scale: isCurrentActive(card) ? 1 : (isAnyCardActive() ? 0.85 : 1),
    
    width: isCurrentActive(card) ? 340 : 280,
    height: isCurrentActive(card) ? 420 : 360,
}}
    whileHover={{
        scale: isCurrentActive(card) ? 1 : (isAnyCardActive() ? 0.9 : 1.03),
    }}
    transition={{
        type: "spring",
        stiffness: 85,
        damping: 14,
        mass: 0.8
    }}
    style={{
        // 5. Z-INDEX FIX: Only the active card jumps to the front. The rest keep their structural order!
        zIndex: isCurrentActive(card) ? 50 : card.config.zIndex,
    }}
    className={cn(
        "w-40 p-8 absolute inset-0 items-start cursor-pointer rounded-2xl flex flex-col justify-between overflow-hidden focus:outline-none",
        card.className
    )}
>
                        {card.skeleton}
                        <div>
                            {/* Slightly scaled down the title text to match the new card size */}
                            <motion.h2 layoutId={card.title + "title"} className="font-poppins max-w-40 text-2xl text-left font-regular ">
                                {card.title}
                            </motion.h2>
                            <AnimatePresence mode="popLayout">
                                {active?.title === card.title && (
                                    <motion.p
                                        layoutId={card.title + "description"}
                                        initial={{ opacity: 0, x: 20, y: 20, height: 0 }}
                                        animate={{ opacity: 1, x: 0, y: 0, height: 100 }}
                                        exit={{ opacity: 0, x: 40, y: 40, }}
                                        transition={{ duration: 0.3, delay: 0.1, }}
                                        className="text-white/80 text-base mt-3 text-left"
                                    >
                                        {card.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.button>
                </motion.div>
            ))}
        </motion.div>
    );
};








const cards = [
        {
            title: "Working Knowledge",
            description:
                "You have a basic understanding of the topic and can apply it to simple situations.",
            skeleton: <div className="h-50 w-full rounded-xl bg-gradient-to-r from-orange-600 to-orange-600/40"></div>,
            className: "bg-orange-500 [&_h2]:text-white",
            config: {
                y: -20,
                x: 0,
                rotate: -15,
                zIndex: 2,
            },
        },

        {
            title: "Practical Demonstration",
            description:
                "You can demonstrate the concept in practice with real-world examples.",
            skeleton: <div className="h-50 w-full rounded-xl bg-gradient-to-r from-neutral-300 to-neutral-400/40"></div>,
            className: "bg-stone-200 [&_p]:text-black",
            config: {
                y: 20,
                x: 180,
                rotate: 8,
                zIndex: 3,
            },
        },
        {
            title: "Collaborate with AI",
            description:
                "You can effectively work alongside AI tools to enhance your workflow.",
            skeleton: <div className="h-50 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-600/40"></div>,
            className: "bg-blue-500 [&_h2]:text-white",
            config: {
                y: -80,
                x: 360,
                rotate: -5,
                zIndex: 4,
            },
        },
        {
            title: "Means & Methods",
            description:
                "You understand the various approaches and techniques available.",
            skeleton: <div className="h-50 w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-600/40"></div>,
            className: "bg-purple-500 [&_h2]:text-white",
            config: {
                y: 20,
                x: 540,
                rotate: 12,
                zIndex: 5,
            },
        },
        {
            title: "Interface Kit",
            description:
                "You have the tools and components needed to build interfaces.",
            skeleton: <div className="h-50 w-full rounded-xl bg-gradient-to-r from-neutral-950 to-neutral-950/40"></div>,
            className: "bg-neutral-900 [&_h2]:text-white",
            config: {
                y: 20,
                x: 720,
                rotate: -5,
                zIndex: 6,
            },
        },
    ];