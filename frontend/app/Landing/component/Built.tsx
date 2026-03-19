import React from "react";
import Check from "./check";
import Tick from "./tick";

const Built = () => {
  return (
    <div className="max-w-6xl mx-auto py-24">
      <h1 className="text-4xl font-poppins">
        Built for people <br />
        who live on the internet
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-12">
        {/* Top Row */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
          <div className="bg-neutral-200 h-48 rounded-xl"></div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-poppins">Developers</h2>
            <p className="text-gray-600">
              Save documentation, tools, tutorials, and references.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
          <div className="bg-neutral-200 h-48 rounded-xl"></div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-poppins">Researchers</h2>
            <p className="text-gray-600">
              Organize articles, studies, and resources in one place.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
          <div className="bg-neutral-200 h-48 rounded-xl"></div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-poppins">Students</h2>
            <p className="text-gray-600">
              Keep track of learning materials and study resources.
            </p>
          </div>
        </div>

        {/* Bottom Row - Fixed */}
        <div className="col-span-2 bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
          <div className="bg-neutral-200 h-48 rounded-xl"></div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-poppins">Founders</h2>
            <p className="text-gray-600">
              Save startup insights, tools, and market research.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
          <div className="bg-neutral-200 h-48 rounded-xl"></div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-poppins">Designers</h2>
            <p className="text-gray-600">
              Store inspiration, UI references, and resources.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-center text-4xl mt-36">
        Better than traditional bookmarks
      </h1>
      <div className="grid grid-cols-3 gap-4 mt-12 justify-items-center">
        <div className="flex flex-col gap-8 mt-12">
          <h1 className="text-2xl">Features</h1>
          <p className="text-lg text-gray-600">AI summaries</p>
          <p className="text-lg text-gray-600">Smart tagging</p>
          <p className="text-lg text-gray-600">Natural search</p>
          <p className="text-lg text-gray-600">Duplicate detection</p>
          <p className="text-lg text-gray-600">Knowledge discovery</p>
        </div>

<div className="flex flex-col gap-8 mt-12 items-center">
          <h1 className="text-2xl">Browser Bookmarks</h1>
          <Check />
          <Check />
          <Check />
          <Check />
          <Check />
          <Check />
          
        </div>


        <div className="flex flex-col gap-8 mt-12 items-center">
          <h1 className="text-2xl">Memora</h1>
          <Tick />
          <Tick />
          <Tick />
          <Tick />
          <Tick />
          <Tick />
        </div>

    
      </div>
    </div>
  );
};

export default Built;
