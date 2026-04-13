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
      <div className="mx-auto mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3 md:grid-rows-2">
        <AuthCard />
        <MapCard />
        <CollabCard />
        <KeyboardCard />
      </div>

      {/* Bottom Features */}
      <div className="grid grid-cols-3 gap-16 mt-16 px-8">
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
