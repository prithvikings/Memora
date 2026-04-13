"use client";
import {
  ChartBarIcon,
  LightningIcon,
  PuzzlePieceIcon,
} from "@phosphor-icons/react";
import { AuthCard } from "../component/svgmotion/AuthMockup";
import { CollabCard } from "../component/svgmotion/CollabCard";
import { MapCard } from "../component/svgmotion/MapMockup";
import { KeyboardCard } from "../component/svgmotion/KeyboardMockup";

const Cleaner = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-5xl font-medium tracking-tight text-neutral-800 font-poppins">
          Autonomous AI workflow features
        </h1>
        <p className="text-lg font-medium tracking-tight text-neutral-600">
          From prototype to production, autonomously
        </p>
      </div>

      {/* Grid Container (Replaces old flex/grid layout with perfectly configured CSS Grid mapping) */}
      <div className="mx-auto mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3 md:grid-rows-2">
        <AuthCard />
        <MapCard />
        <CollabCard />
        <KeyboardCard />
      </div>

      {/* Bottom Features */}
      <div className="grid grid-cols-3 gap-16 mt-16">
        <div className="flex flex-col gap-2">
          <LightningIcon size={24} />
          <h1 className="text-md font-medium tracking-tight text-neutral-800 font-poppins">
            Lightning-fast deployments
          </h1>
          <p className="text-neutral-500 text-start text-xs mb-6 leading-relaxed">
            Push to production in seconds. <br /> Our CI/CD pipeline handles
            builds, <br />
            tests, and rollbacks automatically.
          </p>
        </div>
        <div className=" flex flex-col gap-2">
          <ChartBarIcon size={24} />
          <h1 className="text-md font-medium tracking-tight text-neutral-800 font-poppins">
            Built-in analytics
          </h1>
          <p className="text-neutral-500 text-start text-xs mb-6 leading-relaxed">
            Track user behavior, monitor <br /> performance, and gain actionable{" "}
            <br />
            insights without third-party tools.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <PuzzlePieceIcon size={24} />
          <h1 className="text-md font-medium tracking-tight text-neutral-800 font-poppins">
            Seamless integrations
          </h1>
          <p className="text-neutral-500 text-start text-xs mb-6 leading-relaxed">
            Connect with your existing <br /> stack. Slack, GitHub, Jira, and{" "}
            <br /> 100+ integrations out of the box.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cleaner;

// // Define the steps/features we are scrolling through
// const scrollFeatures = [
//   {
//     id: 0,
//     title: "Bookmark card with summary",
//     mockupText: "Dashboard Mockup UI",
//     compo: CardSummary,
//   },
//   {
//     id: 1,
//     title: "Tag system",
//     mockupText: "Tagging System UI",
//     compo: Taggingsystem,
//   },
//   {
//     id: 2,
//     title: "Search UI",
//     mockupText: "Semantic Search UI",
//     compo: SearchUI,
//   },
//   {
//     id: 3,
//     title: "Collections dashboard",
//     mockupText: "Folders & Collections UI",
//     compo: CollectionDashboard,
//   },
// ];

// const Cleaner = () => {
//   const containerRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Track the scroll progress inside our tall container
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     // "start start" means track from when the top of container hits top of viewport
//     // "end end" means stop tracking when bottom of container hits bottom of viewport
//     offset: ["start start", "end end"],
//   });

//   // Listen to scroll changes and update the active index (0 to 3)
//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     // Multiply by number of features and floor it to get 0, 1, 2, or 3
//     let index = Math.floor(latest * scrollFeatures.length);
//     // Prevent it from going out of bounds at the very bottom
//     if (index >= scrollFeatures.length) index = scrollFeatures.length - 1;
//     setActiveIndex(index);
//   });

//   const ActiveComponent = scrollFeatures[activeIndex].compo;

//   return (
//     // 1. The Tall Parent Container: Creates the "scroll track"
//     // h-[400vh] means it will take 4 screen heights to scroll past this section
//     <div
//       ref={containerRef}
//       className="relative h-[400vh] py-16  w-full bg-neutral-100/50"
//     >
//       {/* Header */}
//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="text-center text-4xl md:text-5xl font-medium tracking-tight text-neutral-800"
//       >
//         A cleaner way to manage knowledge
//       </motion.h1>
//       <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
//         <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 px-4 md:px-0">
//           {/* Dynamic Image / Dashboard Mockup Area */}
//           <div className="relative w-full bg-zinc-200 h-[400px] md:h-[550px] rounded-2xl shadow-sm border border-black/5 overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeIndex}
//                 initial={{ opacity: 0, y: 20, scale: 0.98 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: -20, scale: 0.98 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-zinc-200 to-zinc-300"
//               >
//                 {/* Replace this with your actual next/image components later */}
//                 <ActiveComponent />
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Bottom Highlighting Labels */}
//           <div className="flex flex-wrap items-center justify-center md:justify-around gap-6 text-sm md:text-base font-medium transition-all duration-300">
//             {scrollFeatures.map((feature, index) => {
//               const isActive = activeIndex === index;
//               return (
//                 <p
//                   key={feature.id}
//                   className={`transition-all duration-500 ease-in-out cursor-default ${
//                     isActive
//                       ? "text-black scale-105 drop-shadow-sm"
//                       : "text-gray-400 scale-100"
//                   }`}
//                 >
//                   {feature.title}
//                 </p>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cleaner;
