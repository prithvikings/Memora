"use client";
import React, { useEffect } from "react";
import Navbar from "./Landing/section/Navbar";
import Hero from "./Landing/section/Hero";
import UseFullSection from "./Landing/section/UseFullSection";
import Problem from "./Landing/section/Problem";
import Solution from "./Landing/component/Solution";
import Powerful from "./Landing/section/Powerful";
import Cleaner from "./Landing/section/Cleaner";
import Built from "./Landing/section/Built";
import Join from "./Landing/section/Join";
import CalltoAction from "./Landing/section/CalltoAction";
import Footer from "./Landing/section/Footer";
import SmoothScroll from "./Landing/component/SmoothScroll";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const page = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return <div className="min-h-screen bg-white"></div>;
  }
  return (
    <SmoothScroll>
      {/* 1. TOP SECTION */}
      {/* Added 'relative' here so the absolute fade element stays pinned to this container */}
      <div className="relative w-full bg-[url('/bg4.png')] bg-cover bg-bottom bg-no-repeat">
        <div className="max-w-6xl mx-auto min-h-screen">
          <Navbar />
          <Hero />
        </div>

        {/* THE FADE EFFECT: Placed at the very bottom of this wrapper */}
        <div className="absolute bottom-0 left-0 w-full h-28 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* 2. MIDDLE SECTION: Standard background (no image) for the next components */}
      <div className="max-w-6xl mx-auto">
        <UseFullSection />
        <Problem />
      </div>

      {/* 3. REST OF THE PAGE */}
      <Powerful />
      <div className="mt-36 text-3xl bg-neutral-100 w-full">
        <Cleaner />
      </div>
      <Built />
      <Join />
      <CalltoAction />
      <div className="bg-[#1C1C1C]">
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default page;

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

// import { HeroDesignPrac } from "./Landing/component/HeroDesignPrac";
// import DatabaseCylinderAnimation from "./Landing/component/DatabaseCylinderAnimation";
// import { ExpandingServerRack } from "./Landing/component/ExpandingServerRack";
// import InterlockingNodes from "./Landing/component/InterlockingNodes";
// import UnfoldingBlueprint from "./Landing/component/UnfoldingBlueprint";
// import ProcessingCore from "./Landing/component/ProcessingCore";
// import { AiSummariessvg } from "./Landing/component/svgmotion/AiSummaries";
// import { SmartTagssvg } from "./Landing/component/svgmotion/SmartTags";

// const page = () => {
//   return (
//     <div className="w-full h-screen flex flex-wrap items-center justify-center gap-4 p-8">
//       <AiSummariessvg />
//       {/* <HeroDesignPrac />
//       <DatabaseCylinderAnimation /> */}
//       {/* <ExpandingServerRack /> */}
//       {/* <InterlockingNodes /> */}
//       {/* <UnfoldingBlueprint /> */}
//       {/* <ProcessingCore /> */}
//       <SmartTagssvg />
//     </div>
//   );
// };

// export default page;
