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
              className="group flex flex-col bg-white rounded-3xl p-8 border border-neutral-200 shadow-[0_1px_2px_rgb(0,0,0,0.2)] transition-all duration-300 cursor-pointer"
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
