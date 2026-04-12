"use client";
import React from "react";
import { motion } from "motion/react"; // Added motion import
import UnfoldingBlueprint from "../component/UnfoldingBlueprint";
import SmartTagsIllustration from "../component/svgmotion/SmartTagsIllustration";
import SemanticSearchIllustration from "../component/svgmotion/SemanticSearchIllustration";
const features = [
  {
    title: "AI Summaries",
    description:
      "Instantly grasp the core concepts of any saved link without having to open it.",
    Component: UnfoldingBlueprint,
  },
  {
    title: "Smart Tags",
    description: "Intelligent, automated categorization powered by AI.",
    Component: SmartTagsIllustration,
  },
  {
    title: "Semantic Search",
    description: "Find content by meaning, not just exact keywords.",
    Component: SemanticSearchIllustration,
  },
];
const Powerful = () => {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-neutral-900">
          Supercharge Your Bookmarks
        </h2>
        <p className="text-lg mt-4 font-poppins text-neutral-500 leading-relaxed">
          Everything you need to organize, search, and understand your saved
          content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const FeatureIllustration = feature.Component;
          return (
            <motion.div
              key={index}
              initial="initial"
              whileHover="animate"
              className="group flex flex-col bg-white rounded-3xl p-8 border border-neutral-200/60 hover:shadow-[0_1px_2px_rgb(0,0,0,0.2)] transition-all duration-300 cursor-pointer"
            >
              <div className="w-full h-48 flex items-center justify-center mb-8 bg-slate-50 rounded-2xl overflow-hidden">
                <FeatureIllustration />
              </div>

              <h3 className="text-lg text-center font-poppins font-medium text-neutral-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-center font-poppins text-neutral-500 leading-snug tracking-tight">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Powerful;

// const Powerful = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const containerRef = useRef(null);

//   // Track the scroll progress inside our tall wrapper
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // Listen to scroll changes and update the active index (0 to 4)
//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     let index = Math.floor(latest * features.length);
//     // Prevent index out of bounds
//     if (index >= features.length) index = features.length - 1;
//     if (index < 0) index = 0;
//     setActiveIndex(index);
//   });

//   // THE FIX: Assign the component to a capitalized variable
//   const ActiveComponent = features[activeIndex].comoponents;

//   return (
//     // 1. Tall Parent Container: Creates the "scroll track" (4x screen height)
//     <div ref={containerRef} className="relative h-[400vh]">
//       <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
//         <div className="w-full max-w-6xl mx-auto px-6">
//           {/* Section Header */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             className="text-4xl md:text-5xl font-poppins leading-tight text-center md:text-left"
//           >
//             Powerful Features Designed <br className="hidden md:block" /> for
//             Knowledge Hoarders
//           </motion.h1>

//           {/* Main Content Area */}
//           <div className="flex flex-col md:flex-row items-center justify-center w-full gap-12 md:gap-24 mt-16">
//             {/* Left Side: Dynamic Image Placeholder */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="bg-neutral-200 w-full md:w-2/5 h-80 md:h-[500px] rounded-2xl flex items-center justify-center overflow-hidden relative shadow-sm border border-neutral-300/50"
//             >
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeIndex}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 1.05 }}
//                   transition={{ duration: 0.3 }}
//                   className="absolute inset-0 bg-linear-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-neutral-400 font-medium text-xl text-center px-4"
//                 >
//                   {/* THE FIX: Render as a standard JSX component */}
//                   <ActiveComponent />
//                 </motion.div>
//               </AnimatePresence>
//             </motion.div>

//             {/* Right Side: Scroll-Driven Accordion */}
//             <div className="w-full md:w-3/5 flex flex-col items-start justify-center gap-3">
//               {features.map((feature, index) => {
//                 const isActive = activeIndex === index;

//                 return (
//                   <div
//                     key={index}
//                     className={`w-full rounded-xl p-5 transition-all duration-500 border ${
//                       isActive
//                         ? "bg-neutral-100 border-neutral-300 shadow-sm transform scale-100"
//                         : "bg-transparent border-transparent opacity-40 transform scale-[0.98]"
//                     }`}
//                   >
//                     {/* Accordion Title */}
//                     <h1
//                       className={`text-xl font-medium transition-colors duration-500 ${
//                         isActive ? "text-black" : "text-neutral-500"
//                       }`}
//                     >
//                       {feature.title}
//                     </h1>

//                     {/* Expanding Description Area */}
//                     <AnimatePresence initial={false}>
//                       {isActive && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{ duration: 0.4, ease: "easeInOut" }}
//                           className="overflow-hidden"
//                         >
//                           <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
//                             {feature.description}
//                           </p>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Powerful;
