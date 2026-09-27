"use client";

import React from "react";
import { Cpu, Code2, Brain, ShieldCheck } from "lucide-react";

export const PlatformHighlights: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#312E81] tracking-tight leading-tight font-heading">
            Architected for Verifiable Skill Intelligence
          </h2>
          <p className="text-[#334155] text-sm sm:text-base mt-3 leading-relaxed font-sans">
            Go beyond resumes. NexaDhi captures real coding performance and converts it into clear, employer-ready skill reports.
          </p>
        </div>

        {/* ================================================================= */}
        {/* Outer Dual-Border Chassis with Deep Drop Shadow Effect            */}
        {/* ================================================================= */}
        <div className="relative">
          {/* Ambient Outer Drop Glow Effect */}
          <div className="absolute -inset-1.5 rounded-[32px] sm:rounded-[42px] bg-gradient-to-b from-[#312E81]/6 via-[#7C3AED]/10 to-[#10B981]/6 blur-xl -z-10 pointer-events-none" />

          {/* Feature Cards Grid (4-Column Structured) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: AI-Powered Skill Assessment */}
            <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-slate-200/90 via-slate-100/50 to-slate-200/80 border border-slate-200/80 shadow-[0_4px_16px_rgba(49,46,129,0.04)] hover:shadow-[0_12px_28px_rgba(49,46,129,0.09)] hover:-translate-y-0.5 transition-all duration-300 group flex flex-col">
              <div className="h-full rounded-[14px] bg-white p-4 sm:p-5 border border-slate-100/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-11 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#312E81] flex items-center justify-center group-hover:bg-[#16A34A] group-hover:text-white transition-all shadow-2xs">
                      <Cpu className="size-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono py-0.5 px-2 rounded-full bg-emerald-50 text-[#16A34A] font-bold border border-emerald-200/80">
                        Diagnostics
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#312E81] mb-2 leading-snug font-heading">
                    AI-Powered Skill Assessment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-2 font-sans">
                    Creates personalized coding challenges based on each candidate’s performance. Questions dynamically adjust difficulty based on real-time problem-solving behavior.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Multi-Language Coding Environment */}
            <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-slate-200/90 via-slate-100/50 to-slate-200/80 border border-slate-200/80 shadow-[0_4px_16px_rgba(49,46,129,0.04)] hover:shadow-[0_12px_28px_rgba(49,46,129,0.09)] hover:-translate-y-0.5 transition-all duration-300 group flex flex-col">
              <div className="h-full rounded-[14px] bg-white p-4 sm:p-5 border border-slate-100/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-11 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#312E81] flex items-center justify-center group-hover:bg-[#16A34A] group-hover:text-white transition-all shadow-2xs">
                      <Code2 className="size-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono py-0.5 px-2 rounded-full bg-emerald-50 text-[#16A34A] font-bold border border-emerald-200/80">
                        Compiler
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#312E81] mb-2 leading-snug font-heading">
                    Multi-Language Coding Environment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-2 font-sans">
                    Practice and solve coding problems directly in the browser using Python, C++, Java, Rust, and TypeScript. Ready-to-use sandboxes with automated test validation.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Skill & Personality Assessment */}
            <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-slate-200/90 via-slate-100/50 to-slate-200/80 border border-slate-200/80 shadow-[0_4px_16px_rgba(49,46,129,0.04)] hover:shadow-[0_12px_28px_rgba(49,46,129,0.09)] hover:-translate-y-0.5 transition-all duration-300 group flex flex-col">
              <div className="h-full rounded-[14px] bg-white p-4 sm:p-5 border border-slate-100/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-11 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#312E81] flex items-center justify-center group-hover:bg-[#16A34A] group-hover:text-white transition-all shadow-2xs">
                      <Brain className="size-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono py-0.5 px-2 rounded-full bg-emerald-50 text-[#16A34A] font-bold border border-emerald-200/80">
                        Psychometrics
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#312E81] mb-2 leading-snug font-heading">
                    Skill & Personality Assessment
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-2 font-sans">
                    Measures problem-solving agility, logical reasoning, and teamwork tendencies along with coding performance for a complete, 360-degree candidate profile.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Smart Anti-Cheat System */}
            <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-slate-200/90 via-slate-100/50 to-slate-200/80 border border-slate-200/80 shadow-[0_4px_16px_rgba(49,46,129,0.04)] hover:shadow-[0_12px_28px_rgba(49,46,129,0.09)] hover:-translate-y-0.5 transition-all duration-300 group flex flex-col">
              <div className="h-full rounded-[14px] bg-white p-4 sm:p-5 border border-slate-100/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-11 rounded-xl bg-[#F8FAFC] border border-slate-200 text-[#312E81] flex items-center justify-center group-hover:bg-[#16A34A] group-hover:text-white transition-all shadow-2xs">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono py-0.5 px-2 rounded-full bg-emerald-50 text-[#16A34A] font-bold border border-emerald-200/80">
                        Anti-Cheat
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#312E81] mb-2 leading-snug font-heading">
                    Smart Anti-Cheat System
                  </h3>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mb-2 font-sans">
                    Uses multiple signals to detect suspicious activity, including keystroke cadence anomalies, copy-paste attempts, and dual-monitor usage during assessments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformHighlights;
