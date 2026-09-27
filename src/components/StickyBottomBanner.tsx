"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Sparkles, X } from "lucide-react";

interface StickyBottomBannerProps {
  onOpenLearner: () => void;
  onOpenDemo: () => void;
  learnerCount: number;
}

export const StickyBottomBanner: React.FC<StickyBottomBannerProps> = ({
  onOpenLearner,
  onOpenDemo,
  learnerCount,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Early Access Notification"
      className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#312E81] text-white backdrop-blur-md border-t border-[#4338CA]/50 shadow-[0_-4px_20px_rgba(49,46,129,0.25)] transition-all duration-300 animate-in slide-in-from-bottom"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenLearner}
            className="h-7.5 sm:h-8.5 px-3 sm:px-4 text-[11px] sm:text-xs font-bold rounded-full bg-[#10B981] hover:bg-[#059669] text-white shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-white truncate font-sans">
                <span className="size-2 rounded-full bg-[#10B981] shrink-0 animate-pulse shadow-xs shadow-[#10B981]/80" />
                <span className="font-bold text-white">{1400}+</span>
                <span className="text-slate-200 truncate">Learners Joined Waitlist</span>
              </div>
            </div>
            <ArrowRight className="size-3 ml-1" />
          </Button>

        </div>
      </div>
    </aside>
  );
};
