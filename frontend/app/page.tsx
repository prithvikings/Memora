// "use client";
// import React, { useEffect } from "react";
// import Navbar from "./Landing/section/Navbar";
// import Hero from "./Landing/section/Hero";
// import UseFullSection from "./Landing/section/UseFullSection";
// import Problem from "./Landing/section/Problem";
// import Solution from "./Landing/component/Solution";
// import Powerful from "./Landing/section/Powerful";
// import Cleaner from "./Landing/section/Cleaner";
// import Built from "./Landing/section/Built";
// import Join from "./Landing/section/Join";
// import CalltoAction from "./Landing/section/CalltoAction";
// import Footer from "./Landing/section/Footer";
// import SmoothScroll from "./Landing/component/SmoothScroll";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// const page = () => {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   useEffect(() => {
//     if (!loading && user) {
//       router.push("/dashboard");
//     }
//   }, [user, loading, router]);

//   if (loading || user) {
//     return <div className="min-h-screen bg-white"></div>;
//   }
//   return (
//     <SmoothScroll>
//       {/* 1. TOP SECTION */}
//       {/* Added 'relative' here so the absolute fade element stays pinned to this container */}
//       <div className="relative w-full bg-[url('/bg4.png')] bg-cover bg-bottom bg-no-repeat">
//         <div className="max-w-6xl mx-auto min-h-screen">
//           <Navbar />
//           <Hero />
//         </div>

//         {/* THE FADE EFFECT: Placed at the very bottom of this wrapper */}
//         <div className="absolute bottom-0 left-0 w-full h-28 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
//       </div>

//       {/* 2. MIDDLE SECTION: Standard background (no image) for the next components */}
//       <div className="max-w-6xl mx-auto">
//         <UseFullSection />
//         <Problem />
//       </div>

//       {/* 3. REST OF THE PAGE */}
//       <Powerful />
//       <div className="mt-36 text-3xl bg-neutral-100 w-full">
//         <Cleaner />
//       </div>
//       <Built />
//       <Join />
//       <CalltoAction />
//       <div className="bg-[#1C1C1C]">
//         <Footer />
//       </div>
//     </SmoothScroll>
//   );
// };

// export default page;

// const features = [
//   {
//     title: "AI Summaries",
//     description:
//       "Get concise summaries of your bookmarks, so you can quickly understand the content without having to open the link.",
//     comoponents: AiSummaries,
//   },
//   {
//     title: "Smart Tags",
//     description:
//       "Automatically categorize your saved links with AI-generated tags based on the actual content of the page.",
//     comoponents: Smarttags,
//   },
//   {
//     title: "Semantic Search",
//     description:
//       "Find exactly what you're looking for by searching for concepts and ideas, not just exact keywords.",
//     comoponents: SemanticSearch,
//   },
//   {
//     title: "Automatic Metadata",
//     description:
//       "Pull in authors, publish dates, and hero images automatically to keep your library visually organized.",
//     comoponents: AutomaticMetadata,
//   },
//   {
//     title: "Collections",
//     description:
//       "Group related links together into smart folders that update automatically as you save new content.",
//     comoponents: Collections,
//   },
// ];

// "use client";

// import React from "react";
// import { easeInOut, hover, motion } from "motion/react";
// import { animate } from "motion";

// const SemanticTags = () => {
//   return (
//     <div className="min-h-screen w-full bg-neutral-50 flex items-center justify-center">
//       <motion.div 
//       whileHover="animate"
//       initial="initial"
//       className="bg-white w-[400px] h-[400px] rounded-2xl p-6 shadow-sm">
//         <div
//         className="grid grid-cols-2 gap-2">
//           <motion.div 
//         variants={{
//           animate:{
//             rotate:0,
//           },
//           initial:{
//             rotate:8,
//           }
//         }}
//         transition={{
//           duration:0.2,
//           ease:easeInOut
//         }} className="rounded-full bg-pink-200 border border-pink-600 px-2 py-2 flex items-center justify-center">
//             <p className="text-md font-geist text-pink-500">Ai Tools</p>
//           </motion.div>

//           <motion.div 
//           variants={{
//             animate:{
//               rotate:0,
//             },
//             initial:{
//               rotate:8,
//             }
//           }}

//           transition={{
//             duration:0.2,
//             ease:easeInOut
//           }}
          
//           className="rounded-full bg-blue-200 border border-blue-600 px-2 py-2 flex items-center justify-center">
//             <p className="text-md font-geist text-blue-500">Web Dev</p>
//           </motion.div>

//           <motion.div 
//           variants={{
//             animate:{
//               rotate:0,
//             },
//             initial:{
//               rotate:8,
//             }
//           }}

//           transition={{
//             duration:0.2,
//             ease:easeInOut
//           }}


//           className="rounded-full bg-purple-200 border border-purple-600 px-2 py-2 flex items-center justify-center">
//             <p className="text-md font-geist text-purple-500">Books</p>
//           </motion.div>
//           <motion.div 
          
//           variants={{
//             animate:{
//               rotate:0,
//             },
//             initial:{
//               rotate:8,
//             }
//           }}

//           transition={{
//             duration:0.2,
//             ease:easeInOut
//           }}
//           className="rounded-full bg-yellow-200 border border-yellow-600 px-2 py-2 flex items-center justify-center">
//             <p className="text-md font-geist text-yellow-500">Movies</p>
//           </motion.div>
//         </div>
//         <div className="grid grid-cols-3 gap-3 mt-2">
//           <motion.div 
//           variants={{
//             animate:{
//               rotate:0,
//             },
//             initial:{
//               rotate:8,
//             }
//           }}

//           transition={{
//             duration:0.2,
//             ease:easeInOut
//           }}
//           className="rounded-full bg-green-200 border border-green-600 px-2 py-2 flex items-center justify-center">
//             <p className="text-md font-geist text-green-500">Recipes</p>
//           </motion.div>

//           <motion.div 
//           variants={{
//             animate:{
//               rotate:0,
//             },
//             initial:{
//               rotate:8,
//             }
//           }}

//           transition={{
//             duration:0.2,
//             ease:easeInOut
//           }}
//           className="rounded-full bg-red-200 border border-red-600 px-2 py-2 flex items-center justify-center">
//             <p className="text-md font-geist text-red-500">Travel</p>
//           </motion.div>

//           <motion.div 
//           variants={{
//             animate:{
//               rotate:0,
//             },
//             initial:{
//               rotate:8,
//             }
//           }}

//           transition={{
//             duration:0.2,
//             ease:easeInOut
//           }}
//           className="rounded-full bg-teal-200 border border-teal-600 px-2 py-2 flex items-center justify-center">
//             <p className="text-md font-geist text-teal-500">Fitness</p>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SemanticTags;


import React from "react";
import {motion} from "motion/react";

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
