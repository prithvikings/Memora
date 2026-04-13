import React from "react";

const ChatMockup = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[320px] mx-auto pt-4 pb-8 font-sans">
      {/* Message 1 - System / Left */}
      <div className="flex items-start gap-3 w-full">
        {/* Avatar 1 */}
        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="9" r="4" fill="#475569" />
            <path
              d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22"
              fill="#475569"
            />
          </svg>
        </div>

        {/* Chat Bubble 1 */}
        <div className="bg-white border border-neutral-200 py-2.5 px-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <p className="text-[12px] text-neutral-700 font-medium">
            Workflow completed. 847 tasks processed.
          </p>
        </div>
      </div>

      {/* Message 2 - User / Right */}
      <div className="flex items-start justify-end gap-3 w-full pl-8">
        {/* Chat Bubble 2 */}
        <div className="bg-white border border-neutral-200 py-2.5 px-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <p className="text-[12px] text-neutral-700 font-medium">
            Deploy to production
          </p>
        </div>

        {/* Avatar 2 */}
        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="9" r="4" fill="#3B82F6" />
            <path
              d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22"
              fill="#3B82F6"
            />
          </svg>
        </div>
      </div>

      {/* Message 3 - System / Left */}
      <div className="flex items-start gap-3 w-full">
        {/* Avatar 3 */}
        <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="9" r="4" fill="#0D9488" />
            <path
              d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22"
              fill="#0D9488"
            />
          </svg>
        </div>

        {/* Chat Bubble 3 */}
        <div className="bg-white border border-neutral-200 py-2.5 px-4 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <p className="text-[12px] text-neutral-700 font-medium">
            Deployed. All systems operational.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMockup;
