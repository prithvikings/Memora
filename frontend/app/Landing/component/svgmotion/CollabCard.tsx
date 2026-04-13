import React from "react";
import { motion } from "motion/react";

export const CollabCard = () => {
  // Pre-calculated random-feeling delays and durations for the 7 beams
  // (Hardcoded to avoid React hydration mismatches on page load)
  const beamConfigs = [
    { delay: 0.2, duration: 2.1 },
    { delay: 1.5, duration: 2.8 },
    { delay: 0.7, duration: 1.9 },
    { delay: 2.1, duration: 3.2 },
    { delay: 0.4, duration: 2.4 },
    { delay: 1.8, duration: 2.6 },
    { delay: 0.9, duration: 2.0 },
  ];

  // Variants for staggered chat bubble entrances
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10 md:row-span-2">
      <div className="flex h-full flex-col">
        <div className="flex flex-col gap-2 p-6">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
            Real-time collaboration
          </h3>
          <p className="text-sm text-balance text-neutral-600 dark:text-neutral-400">
            Connect with your team instantly. AI-powered insights help you work
            smarter together.
          </p>
        </div>
        <div className="mt-auto flex flex-1 flex-col items-center justify-between gap-2 overflow-hidden pt-4">
          {/* Chat Bubbles - Animated on Scroll */}
          <div className="flex min-h-0 shrink items-center justify-center p-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }} // Triggers when scrolling into view
              className="flex flex-col justify-center gap-3"
            >
              <motion.div
                variants={bubbleVariants}
                className="flex items-start gap-3"
              >
                <img
                  alt="AI Agent"
                  className="size-8 shrink-0 rounded-full object-cover"
                  src="https://assets.aceternity.com/avatars/1.webp"
                />
                <div className="rounded-xl bg-blue-400 px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-800 dark:text-neutral-200">
                  Workflow completed. 847 tasks processed.
                </div>
              </motion.div>

              <motion.div
                variants={bubbleVariants}
                className="flex flex-row-reverse items-start gap-3"
              >
                <img
                  alt="You"
                  className="size-8 shrink-0 rounded-full object-cover"
                  src="https://assets.aceternity.com/avatars/manu.webp"
                />
                <div className="rounded-xl bg-zinc-100 px-3 py-2 text-sm text-neutral-700 shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-800 dark:text-neutral-200">
                  Deploy to production
                </div>
              </motion.div>

              <motion.div
                variants={bubbleVariants}
                className="flex items-start gap-3"
              >
                <img
                  alt="AI Agent"
                  className="size-8 shrink-0 rounded-full object-cover"
                  src="https://assets.aceternity.com/avatars/8.webp"
                />
                <div className="rounded-xl bg-blue-400 px-3 py-2 text-sm text-neutral-100 shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-800 dark:text-neutral-200">
                  Deployed. All systems operational.
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated Lines - Continuous Random Vertical Beams */}
          <div className="relative flex h-24 w-full shrink-0 items-center justify-center gap-6 overflow-hidden px-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-linear-to-b from-white to-transparent dark:from-neutral-900" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-linear-to-t from-white to-transparent dark:from-neutral-900" />

            {beamConfigs.map((config, index) => (
              <div key={index} className="relative h-full w-px">
                <div className="absolute inset-0 border-l border-dashed border-neutral-300 dark:border-neutral-600" />
                <motion.div
                  className="absolute left-0 h-12 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{
                    y: "400%", // Moves it all the way down
                    opacity: [0, 1, 1, 0], // Fades in and out during transit
                  }}
                  transition={{
                    duration: config.duration,
                    repeat: Infinity,
                    delay: config.delay,
                    ease: "linear",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Split Avatar View - Continuous Scanning Image */}
          <div className="shrink-0 scale-75">
            <div className="mx-auto max-w-xl">
              <div className="relative h-60 w-52 rounded-lg bg-gray-200 p-4 dark:bg-neutral-800/50">
                {/* ... (Keep all your decorative corner gradients exactly the same here) ... */}

                <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 shadow-black/10 dark:bg-neutral-800">
                  <div className="absolute inset-0">
                    {/* Background Grayscale Image */}
                    <img
                      width="300"
                      height="300"
                      alt="Second Person Background"
                      className="h-full w-full object-cover grayscale"
                      src="https://assets.aceternity.com/avatars/2.webp"
                    />

                    {/* Animated Color Image (The Reveal) */}
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      animate={{
                        clipPath: [
                          "inset(0px 100% 0px 0px)",
                          "inset(0px 0% 0px 0px)",
                          "inset(0px 100% 0px 0px)",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <img
                        width="300"
                        height="300"
                        alt="Second Person Revealed"
                        className="h-full w-full object-cover"
                        src="https://assets.aceternity.com/avatars/2.webp"
                      />
                    </motion.div>

                    {/* Animated Scanning Line */}
                    <motion.div
                      className="absolute bottom-0 top-0 w-px bg-gradient-to-b from-transparent via-sky-500 to-transparent"
                      style={{
                        boxShadow:
                          "rgba(59, 130, 246, 0.9) 0px 0px 20px, rgba(99, 102, 241, 0.7) 0px 0px 40px, rgba(139, 92, 246, 0.5) 0px 0px 60px",
                      }}
                      animate={{ left: ["0%", "100%", "0%"] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {/* I kept your existing particles inside the scanner line, they will ride along with it now */}
                      <span
                        className="absolute rounded-full"
                        style={{
                          left: "-13.5744px",
                          top: "10.9764%",
                          width: "2.08257px",
                          height: "2.08257px",
                          backgroundColor: "var(--color-blue-500)",
                          boxShadow:
                            "0 0 1.0412860424239423px var(--color-blue-500)",
                        }}
                      />
                      <span
                        className="absolute rounded-full"
                        style={{
                          left: "-8.49718px",
                          top: "37.9349%",
                          width: "1.75071px",
                          height: "1.75071px",
                          backgroundColor: "var(--color-blue-500)",
                          boxShadow:
                            "0 0 0.875356237557976px var(--color-blue-500)",
                        }}
                      />
                      <span
                        className="absolute rounded-full"
                        style={{
                          left: "-12.1012px",
                          top: "9.70187%",
                          width: "1.92723px",
                          height: "1.92723px",
                          backgroundColor: "var(--color-purple-500)",
                          boxShadow:
                            "0 0 0.963615734161305px var(--color-purple-500)",
                        }}
                      />
                      {/* Add back the rest of your particle spans here if you like! */}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
