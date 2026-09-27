"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HeroMockup } from "@/components/HeroMockup";
import { SocialProofTicker } from "@/components/SocialProofTicker";
import { PersonaBentoGrid } from "@/components/PersonaBentoGrid";
import { PlatformHighlights } from "@/components/PlatformHighlights";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { StickyBottomBanner } from "@/components/StickyBottomBanner";
import { LearnerRegistrationModal } from "@/components/B2CRegistrationModal";
import { DemoWaitlistModal } from "@/components/B2BWaitlistModal";

export default function Home() {
  const [isLearnerOpen, setIsLearnerOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoDefaultType, setDemoDefaultType] = useState<"enterprise" | "institution">("enterprise");
  const [learnerCount, setLearnerCount] = useState(14842);

  // Subtle real-time counter increment for social proof momentum
  useEffect(() => {
    const timer = setInterval(() => {
      setLearnerCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const openLearner = () => {
    setIsLearnerOpen(true);
  };

  const openDemo = (type: "enterprise" | "institution" = "enterprise") => {
    setDemoDefaultType(type);
    setIsDemoOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 relative">
      {/* Navigation Bar */}
      <Navbar onOpenLearner={openLearner} onOpenDemo={() => openDemo("enterprise")} />

      <main className="flex-1">
        <HeroSection onOpenLearner={openLearner} onOpenDemo={() => openDemo("enterprise")} />

        <HeroMockup />

        <SocialProofTicker />

        <PersonaBentoGrid onOpenLearner={openLearner} onOpenDemo={() => openDemo("enterprise")} />

        <PlatformHighlights />

        <FAQSection onOpenLearner={openLearner} onOpenDemo={() => openDemo("enterprise")} />
      </main>

      <Footer onOpenLearner={openLearner} onOpenDemo={() => openDemo("enterprise")} />

      <StickyBottomBanner
        onOpenLearner={openLearner}
        onOpenDemo={() => openDemo("enterprise")}
        learnerCount={learnerCount}
      />

      <LearnerRegistrationModal isOpen={isLearnerOpen} onClose={() => setIsLearnerOpen(false)} />

      <DemoWaitlistModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        defaultType={demoDefaultType}
      />
    </div>
  );
}
