"use client";

import React from "react";

const tickerItems = [
  "14,800+ Engineers Joined Wishlist",
  "Adaptive AI Skill Diagnostics",
  "In-Browser Multi-Language Sandboxes",
  "Smart Multi-Signal Anti-Cheat",
  "500+ Institutions & Companies Joining",
  "Direct Recruiter Visibility",
  "Automated College Placement Drives",
  "Verified Skill Credentials",
];

export const SocialProofTicker: React.FC = () => {
  return (
    <div className="w-full bg-[#312E81] text-white py-3 sm:py-3.5 overflow-hidden select-none border-y border-[#4338CA]/40 group">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Render twice for continuous seamless infinite loop */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
          {tickerItems.map((item, idx) => (
            <div key={`item-1-${idx}`} className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-extrabold tracking-wide uppercase font-heading text-white">
              <span>{item}</span>
              <span className="size-1.5 sm:size-2 rounded-full bg-[#10B981] shrink-0 shadow-xs shadow-[#10B981]/50" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8" aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <div key={`item-2-${idx}`} className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-extrabold tracking-wide uppercase font-heading text-white">
              <span>{item}</span>
              <span className="size-1.5 sm:size-2 rounded-full bg-[#10B981] shrink-0 shadow-xs shadow-[#10B981]/50" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

