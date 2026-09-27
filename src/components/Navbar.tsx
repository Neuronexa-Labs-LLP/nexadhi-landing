"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenLearner: () => void;
  onOpenDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLearner }) => {
  return (
    <header className="sticky top-0 z-100 w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group py-1">
          <Image
            src="/logo.png"
            alt="NexaDhi"
            width={240}
            height={80}
            priority
            className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Join Waitlist Button */}
        <Button
          variant="primary"
          size="sm"
          onClick={onOpenLearner}
          className="text-xs sm:text-sm font-bold rounded-full bg-[#312E81] hover:bg-[#1E1B4B] text-white shadow-md px-4 sm:px-5 py-2 sm:py-2.5 cursor-pointer flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <span>Join Waitlist</span>
          <ArrowRight className="size-3.5 sm:size-4" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
