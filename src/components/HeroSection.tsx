"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackgroundAnimation } from "@/components/HeroBackgroundAnimation";
import { ThinkingOrb } from "thinking-orbs";

interface HeroSectionProps {
  onOpenLearner: () => void;
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenLearner, onOpenDemo }) => {
  const [learnerCount, setLearnerCount] = useState(14842);

  useEffect(() => {
    const interval = setInterval(() => {
      setLearnerCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[80vh] md:min-h-[100vh] pb-14  md:pb-18 pt-[250px] -mt-[100px] overflow-hidden flex flex-col justify-center">
      <HeroBackgroundAnimation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mt-[-50px]">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#312E81] tracking-tight leading-[1.2] sm:leading-[1.15] mb-5 max-w-4xl mx-auto font-heading">
          The Future of AI-Powered{" "}
          <span className="relative inline-block text-[#312E81] mt-1 sm:mt-0">
            Learning & Hiring
            <span className="absolute left-0 right-0 -bottom-1 sm:-bottom-1.5 h-1 sm:h-1.5 bg-gradient-to-r from-[#16A34A] via-[#10B981] to-[#16A34A] rounded-full -z-10 opacity-80" />
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto mb-8 leading-relaxed font-normal font-sans">
          NexaDhi by Neuronexa is an AI-powered platform that connects verified engineering talent with companies and institutions through skill-based assessments and smart recruitment tools.
        </p>

        <div className="flex flex-col items-center justify-center mb-6 max-w-xl mx-auto">
          <Button
            variant="primary"
            size="default"
            onClick={onOpenLearner}
            className="w-auto px-8 h-12 text-sm sm:text-base font-semibold rounded-full bg-[#312E81] hover:bg-[#1E1B4B] text-white shadow-md group cursor-pointer"
          >
            <span>Join Waitlist</span>
          </Button>

          <div className="mt-3 text-center text-xs font-medium text-slate-500 font-sans flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
            <span>
              <strong className="text-[#16A34A] font-bold">1,400+</strong> learners joined
            </span>
            <span className="hidden sm:inline mx-2 text-slate-400 font-bold">•</span>
            <span>
              <strong className="text-[#312E81] font-bold">50+</strong> institutions
            </span>
            <span className="hidden sm:inline mx-2 text-slate-400 font-bold">•</span>
            <span>
              <strong className="text-[#312E81] font-bold">300+</strong> companies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
