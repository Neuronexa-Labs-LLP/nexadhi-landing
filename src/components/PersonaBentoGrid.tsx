"use client";

import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Building2,
  School,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonaSignalMap } from "@/components/PersonaSignalMap";

interface PersonaBentoGridProps {
  onOpenLearner: () => void;
  onOpenDemo: (type?: "enterprise" | "institution") => void;
}

type PersonaType = "learners" | "institutions" | "enterprises";

interface PersonaConfig {
  id: PersonaType;
  tabLabel: string;
  icon: React.ElementType;
  headline: string;
}

export const PersonaBentoGrid: React.FC<PersonaBentoGridProps> = ({
  onOpenLearner,
  onOpenDemo,
}) => {
  const [activeTab, setActiveTab] = useState<PersonaType>("learners");

  const personasData: Record<PersonaType, PersonaConfig> = useMemo(
    () => ({
      learners: {
        id: "learners",
        tabLabel: "Individual Learners",
        icon: GraduationCap,
        headline: "Student & Individual Learner Lifecycle",
      },
      institutions: {
        id: "institutions",
        tabLabel: "Institutes & Colleges",
        icon: School,
        headline: "Academic Institutions & Placement Lifecycle",
      },
      enterprises: {
        id: "enterprises",
        tabLabel: "Companies & Recruiters",
        icon: Building2,
        headline: "Companies & Technical Hiring Pipeline",
      },
    }),
    []
  );

  const handleTabChange = (val: string) => {
    setActiveTab(val as PersonaType);
  };

  const handleCta = () => {
    if (activeTab === "learners") {
      onOpenLearner();
    } else if (activeTab === "institutions") {
      onOpenDemo("institution");
    } else {
      onOpenDemo("enterprise");
    }
  };

  return (
    <section
      id="personas"
      className="py-16 bg-[#F8FAFC] border-y border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#312E81] tracking-tight leading-tight font-heading">
            Built for the Entire AI-Native Talent Lifecycle
          </h2>
        </div>

        {/* Audience Persona Tabs Switcher */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* INTERACTIVE PIPELINE RUNTIME MAP CANVAS CARD */}
          <div className="w-full rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_24px_rgba(49,46,129,0.06)] overflow-hidden relative transition-all">
            {/* Card Header with Tabs Switcher INSIDE */}
            <div className="px-3 py-3 sm:px-6 sm:py-3.5 border-b border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8FAFC]">
              {/* Tabs list inside Card Header */}
              <div className="w-full flex justify-center">
                <TabsList className="w-full sm:w-auto h-auto p-1 bg-slate-200/80 border border-slate-300/80 rounded-full flex sm:inline-flex items-center justify-center gap-1 shadow-2xs">
                  <TabsTrigger
                    value="learners"
                    className="flex-1 sm:flex-initial group gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11.5px] sm:text-sm font-semibold data-[state=active]:bg-[#312E81] data-[state=active]:text-white data-[state=active]:shadow-xs text-[#334155] transition-all font-sans cursor-pointer whitespace-nowrap justify-center"
                  >
                    <GraduationCap className="size-3.5 sm:size-4 shrink-0" />
                    <span>
                      <span className="hidden sm:inline">Individual </span>Learners
                    </span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="institutions"
                    className="flex-1 sm:flex-initial group gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11.5px] sm:text-sm font-semibold data-[state=active]:bg-[#312E81] data-[state=active]:text-white data-[state=active]:shadow-xs text-[#334155] transition-all font-sans cursor-pointer whitespace-nowrap justify-center"
                  >
                    <School className="size-3.5 sm:size-4 shrink-0" />
                    <span>
                      <span className="hidden sm:inline">Institutes & </span>Colleges
                    </span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="enterprises"
                    className="flex-1 sm:flex-initial group gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11.5px] sm:text-sm font-semibold data-[state=active]:bg-[#312E81] data-[state=active]:text-white data-[state=active]:shadow-xs text-[#334155] transition-all font-sans cursor-pointer whitespace-nowrap justify-center"
                  >
                    <Building2 className="size-3.5 sm:size-4 shrink-0" />
                    <span>
                      <span className="hidden sm:inline">Companies & </span>Recruiters
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Pipeline Stage Body (Dedicated Mobile Zig-Zag & Desktop Canvas) */}
            <div className="w-full relative bg-white">
              <PersonaSignalMap persona={activeTab} />
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

