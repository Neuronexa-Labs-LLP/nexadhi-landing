"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useInView } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  Briefcase,
  BarChart2,
  Blocks,
  Settings,
  Search,
  Bell,
  Calendar,
  ChevronDown,
  UserCheck,
  User,
  Sparkles,
  Brain,
  Target,
  CheckCircle2,
} from "lucide-react";

interface Learner {
  name: string;
  role: string;
  score: string;
  gain: string;
  avatar: string;
  initials: string;
}

const LEARNERS: Learner[] = [
  {
    name: "Rohan Verma",
    role: "Full Stack Developer",
    score: "98.4%",
    gain: "↑ 12%",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    initials: "RV",
  },
  {
    name: "Sneha Iyer",
    role: "Cloud Architect",
    score: "97.2%",
    gain: "↑ 10%",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    initials: "SI",
  },
  {
    name: "Arjun Mehta",
    role: "AI/ML Engineer",
    score: "96.8%",
    gain: "↑ 14%",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    initials: "AM",
  },
];

const SKILL_SEGMENTS = [
  { name: "Data Structures", percent: 28, color: "#312E81" },
  { name: "System Design", percent: 22, color: "#4338CA" },
  { name: "Cloud & DevOps", percent: 18, color: "#7C3AED" },
  { name: "Product", percent: 16, color: "#10B981" },
  { name: "Aptitude", percent: 16, color: "#A78BFA" },
];

const PSYCHOMETRIC_DIMENSIONS = [
  { name: "Deductive & Analytical", score: 96, percentile: "Top 2%", color: "#312E81" },
  { name: "Problem-Solving Speed", score: 94, percentile: "Top 4%", color: "#4338CA" },
  { name: "Situational Judgement", score: 89, percentile: "Top 7%", color: "#7C3AED" },
  { name: "Work Resilience & EQ", score: 92, percentile: "Top 5%", color: "#10B981" },
  { name: "Collaborative Synergy", score: 90, percentile: "Top 6%", color: "#16A34A" },
];

const PSYCHO_SEGMENTS = [
  { name: "Analytical Thinkers", percent: 34, color: "#312E81" },
  { name: "Strategic Leaders", percent: 26, color: "#4338CA" },
  { name: "Adaptive Solvers", percent: 22, color: "#7C3AED" },
  { name: "Execution Drivers", percent: 18, color: "#10B981" },
];

const NAV_ITEMS: { name: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Learning", icon: BookOpen },
  { name: "Assessments", icon: FileText },
  { name: "Psychometric Assessments", icon: Brain },
  { name: "Candidates", icon: Users },
  { name: "Hiring", icon: Briefcase },
  { name: "Analytics", icon: BarChart2 },
  { name: "Integrations", icon: Blocks },
  { name: "Settings", icon: Settings },
];

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.8,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });

  useEffect(() => {
    if (!inView) {
      setDisplayValue(0);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing: easeOutExpo for ultra smooth acceleration & deceleration
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * value;
      
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, value, duration]);

  const formatted = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.round(displayValue).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export const HeroMockup: React.FC = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Responsive device check for mobile viewport optimizations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll Progress tracking for the Mockup Section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Buttery-smooth spring response on desktop
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // 3D Tilt: active on desktop, completely flat on mobile
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.28, 0.65, 1],
    shouldReduceMotion || isMobile ? [0, 0, 0, 0] : [10, 0, 0, -4]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.28, 0.65, 1],
    shouldReduceMotion || isMobile ? [1, 1, 1, 1] : [0.95, 1, 1, 0.97]
  );
  const y = useTransform(
    smoothProgress,
    [0, 0.28, 0.65, 1],
    shouldReduceMotion || isMobile ? [0, 0, 0, 0] : [24, 0, 0, -12]
  );
  const opacity = useTransform(
    smoothProgress,
    [0, 0.12, 0.88, 1],
    isMobile ? [1, 1, 1, 1] : [0.88, 1, 1, 0.88]
  );

  // Parallax shifts for floating badges (desktop only)
  const badge1Y = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion || isMobile ? [0, 0] : [-16, 16]
  );
  const badge2Y = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion || isMobile ? [0, 0] : [16, -16]
  );

  return (
    <div
      ref={containerRef}
      className="relative max-w-5xl lg:max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 my-10 [perspective:none] md:[perspective:1400px]"
    >
      {/* Soft ambient background glow */}
      <motion.div
        style={{ scale: isMobile ? 1 : scale, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[240px] sm:h-[300px] bg-gradient-to-tr from-[#7C3AED]/15 via-[#EEF2FF]/40 to-[#312E81]/5 rounded-full blur-2xl -z-10 pointer-events-none"
      />


      {/* Realistic Laptop Chassis Mockup Frame: fits cleanly within 80vh */}
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          transformStyle: isMobile ? "flat" : "preserve-3d",
        }}
        className="relative mx-auto select-none will-change-transform max-h-[80vh] flex flex-col"
      >
        {/* Laptop Screen Bezel (Space Gray Outer Border) */}
        <div className="relative bg-[#111625] rounded-t-[14px] sm:rounded-t-[20px] p-1.5 sm:p-2 pb-0 shadow-[0_16px_40px_-12px_rgba(27,35,77,0.22)] border border-[#232B45] flex-1 min-h-0 flex flex-col">
          {/* Top Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-2 sm:h-2.5 bg-[#111625] rounded-b-md flex items-center justify-center z-30">
            <div className="size-1 rounded-full bg-[#1e2742] border border-[#2a3556] flex items-center justify-center">
              <div className="size-0.5 rounded-full bg-[#0d1322]" />
            </div>
          </div>

          {/* Screen Glass Inner Area */}
          <div className="bg-[#F8FAFC] rounded-t-[10px] sm:rounded-t-[14px] overflow-hidden border border-slate-200/80 shadow-inner flex-1 min-h-0 flex flex-col">
            {/* Dashboard Workspace Layout: Responsive Mobile Bar / Desktop Left Sidebar + Main Content */}
            <div className="flex flex-col lg:flex-row flex-1 min-h-0 text-slate-800 overflow-hidden">

              {/* ------------------------------------------------------------- */}
              {/* MOBILE ONLY: Sleek Horizontal Scrollable Tabs Bar (< lg)       */}
              {/* ------------------------------------------------------------- */}
              <div className="lg:hidden bg-white border-b border-slate-100 flex flex-col shrink-0">
                {/* Mobile Top Brand Bar */}
                <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-100/80">
                  <div className="flex items-center gap-1.5">
                    <Image
                      src="/nexadhi-brand-logo.png"
                      alt="NexaDhi"
                      width={100}
                      height={32}
                      className="h-5 sm:h-6 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-[#312E81] bg-[#EEF2FF] border border-[#C7D2FE] px-2 py-0.5 rounded-full truncate max-w-[120px]">
                    {activeNav}
                  </span>
                </div>

                {/* Mobile Scrollable Pill Tabs without visible scrollbar */}
                <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2 py-1 bg-slate-50/60">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setActiveNav(item.name)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${isActive
                          ? "bg-[#312E81] text-white shadow-2xs font-bold"
                          : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                          }`}
                      >
                        <Icon className={`size-3 shrink-0 ${isActive ? "text-[#7C3AED]" : "text-slate-400"}`} />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* DESKTOP ONLY: Compact Left Sidebar (hidden on mobile, lg:flex)*/}
              {/* ------------------------------------------------------------- */}
              <aside className="hidden lg:flex w-[185px] bg-white border-r border-slate-100 p-2 sm:p-2.5 flex-col justify-between shrink-0">
                <div className="space-y-2.5">
                  {/* Brand Logo */}
                  <div className="flex items-center gap-2 px-1.5 py-0.5">
                    <Image
                      src="/nexadhi-brand-logo.png"
                      alt="NexaDhi"
                      width={120}
                      height={36}
                      className="h-6 sm:h-7 w-auto object-contain"
                    />
                  </div>

                  {/* Navigation Links */}
                  <nav className="space-y-0.5">
                    {NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeNav === item.name;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setActiveNav(item.name)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-[10px] sm:text-[10.5px] font-semibold transition-all cursor-pointer ${isActive
                            ? "bg-[#EEF2FF] text-[#312E81] shadow-2xs font-bold"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <Icon className={`size-3.5 shrink-0 ${isActive ? "text-[#312E81]" : "text-slate-400"}`} />
                            <span className="whitespace-nowrap">{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[7.5px] font-black uppercase tracking-wider px-1 py-0.2 rounded-full bg-[#312E81] text-[#7C3AED] shrink-0 ml-1">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* ------------------------------------------------------------- */}
              {/* Main Content Area                                             */}
              {/* ------------------------------------------------------------- */}
              <main className="flex-1 p-2.5 sm:p-3.5 lg:p-4 space-y-2 sm:space-y-2.5 bg-[#F8FAFC] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                  <div>
                    <h2 className="text-sm sm:text-base lg:text-lg font-extrabold text-[#312E81] tracking-tight font-heading leading-tight">
                      {activeNav === "Psychometric Assessments"
                        ? "Psychometric & Behavioral Suite"
                        : "Welcome back, Arjun"}
                    </h2>
                    <p className="text-[9.5px] sm:text-[10px] text-slate-500 font-normal">
                      {activeNav === "Psychometric Assessments"
                        ? "AI-calibrated cognitive agility, situational judgement, and cultural fit metrics."
                        : "Here's what's happening with your learning and hiring today."}
                    </p>
                  </div>

                  {/* Top Bar Actions */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    {/* Search Bar */}
                    <div className="relative flex-1 sm:w-44 lg:w-48">
                      <Search className="size-2.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        readOnly
                        placeholder={
                          activeNav === "Psychometric Assessments"
                            ? "Search cognitive traits..."
                            : "Search candidates, skills..."
                        }
                        className="w-full h-6 sm:h-6.5 pl-6 pr-2 text-[9px] sm:text-[10px] bg-white border border-slate-200/90 rounded-full text-slate-700 placeholder-slate-400 shadow-2xs focus:outline-none"
                      />
                    </div>

                    {/* Bell Notification */}
                    <button
                      type="button"
                      className="size-6 sm:size-6.5 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-500 relative shadow-2xs hover:bg-slate-50 cursor-pointer shrink-0"
                    >
                      <Bell className="size-2.5 sm:size-3" />
                      <span className="size-1 rounded-full bg-[#10B981] absolute top-1 right-1 border border-white" />
                    </button>

                    {/* User Avatar */}
                    <div className="size-6 sm:size-6.5 rounded-full bg-[#EEF2FF] text-[#312E81] font-bold text-[10px] flex items-center justify-center shadow-2xs border border-white shrink-0">
                      A
                    </div>

                    {/* Date Range Selector - hidden on mobile, visible on sm: */}
                    <div className="hidden sm:flex items-center gap-1 h-6 sm:h-6.5 px-2 rounded-lg bg-white border border-slate-200/90 text-[9px] font-semibold text-slate-700 shadow-2xs shrink-0">
                      <Calendar className="size-2.5 text-slate-400" />
                      <span>Jun 1 – Jun 30, 2026</span>
                      <ChevronDown className="size-2.5 text-slate-400 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* CONDITIONAL WORKSPACE: PSYCHOMETRIC ASSESSMENTS VIEW VS DEFAULT DASHBOARD */}
                {activeNav === "Psychometric Assessments" ? (
                  /* ========================================================== */
                  /* PSYCHOMETRIC ASSESSMENTS WORKSPACE                         */
                  /* ========================================================== */
                  <div className="space-y-2 sm:space-y-2.5">
                    {/* 4 Psychometric Metric Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2">
                      {[
                        {
                          label: "Cognitive Agility",
                          numValue: 94.8,
                          decimals: 1,
                          suffix: " / 100",
                          change: "Top 2%",
                          icon: Brain,
                          path: "M 0 28 C 20 28, 35 12, 60 16 C 85 20, 105 8, 130 12 C 155 16, 175 4, 200 6",
                        },
                        {
                          label: "Emotional EQ",
                          numValue: 91.2,
                          decimals: 1,
                          suffix: " / 100",
                          change: "Top 5%",
                          icon: Sparkles,
                          path: "M 0 26 C 25 24, 40 16, 65 20 C 90 24, 110 8, 140 14 C 165 20, 180 6, 200 4",
                        },
                        {
                          label: "Workplace Fit",
                          numValue: 96.5,
                          decimals: 1,
                          suffix: "%",
                          change: "High Synergy",
                          icon: Users,
                          path: "M 0 30 C 25 30, 45 18, 70 22 C 95 26, 120 10, 150 16 C 175 22, 185 8, 200 4",
                        },
                        {
                          label: "Solving Speed",
                          numValue: 1.38,
                          decimals: 2,
                          suffix: "x",
                          change: "↑ 24%",
                          icon: Target,
                          path: "M 0 28 C 30 26, 50 14, 80 18 C 110 22, 130 8, 160 12 C 180 16, 190 6, 200 4",
                        },
                      ].map((card, i) => {
                        const Icon = card.icon;
                        return (
                          <div
                            key={i}
                            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between relative overflow-hidden"
                          >
                            <div>
                              <div className="flex items-center gap-1 text-slate-600 mb-0.5">
                                <Icon className="size-2.5 sm:size-3 text-[#312E81] shrink-0" />
                                <span className="text-[8.5px] sm:text-[9.5px] font-medium text-slate-600 truncate">{card.label}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-1 flex-wrap">
                                <span className="text-xs sm:text-base lg:text-lg font-extrabold text-[#312E81] font-heading">
                                  <AnimatedNumber value={card.numValue} decimals={card.decimals} suffix={card.suffix} duration={1.6} />
                                </span>
                                <span className="text-[7.5px] sm:text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded-full border border-emerald-200/50">
                                  {card.change}
                                </span>
                              </div>
                            </div>

                            {/* Sparkline Graphic */}
                            <div className="w-full h-4 sm:h-5 mt-0.5 -mb-0.5">
                              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 36" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id={`psychoSparkGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                                  </linearGradient>
                                </defs>
                                <motion.path
                                  d={`${card.path} L 200 36 L 0 36 Z`}
                                  fill={`url(#psychoSparkGrad-${i})`}
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: false, amount: 0.2 }}
                                  transition={{ duration: 0.8, delay: i * 0.1 }}
                                />
                                <motion.path
                                  d={card.path}
                                  fill="none"
                                  stroke="#7C3AED"
                                  strokeWidth="1.75"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: false, amount: 0.2 }}
                                  transition={{ duration: 1.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                />
                              </svg>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Middle Section: Trait Spectrum & Cognitive Archetype */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-1.5 sm:gap-2">
                      {/* Left: Behavioral Trait Dimensions (7 Cols) */}
                      <div className="lg:col-span-7 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                          <h3 className="text-[10px] sm:text-[11px] font-bold text-[#312E81] font-heading flex items-center gap-1">
                            <Brain className="size-3 text-[#312E81]" />
                            <span>Core Behavioral & Cognitive Dimensions</span>
                          </h3>
                          <span className="text-[7.5px] sm:text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200/60">
                            Validated
                          </span>
                        </div>

                        <div className="space-y-1 sm:space-y-1.5 py-0.5">
                          {PSYCHOMETRIC_DIMENSIONS.map((dim, idx) => (
                            <div key={dim.name} className="space-y-0.5">
                              <div className="flex items-center justify-between text-[9px] sm:text-[9.5px]">
                                <span className="font-semibold text-slate-700 truncate mr-1.5">{dim.name}</span>
                                <div className="flex items-center gap-1 shrink-0">
                                  <span className="text-[8px] text-slate-400">{dim.percentile}</span>
                                  <span className="font-mono font-bold text-[#312E81]">{dim.score}%</span>
                                </div>
                              </div>
                              <div className="h-1 sm:h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: dim.color }}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${dim.score}%` }}
                                  viewport={{ once: false, amount: 0.3 }}
                                  transition={{ duration: 1.2, delay: 0.1 + idx * 0.1, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Cognitive Archetype Breakdown (5 Cols) */}
                      <div className="lg:col-span-5 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <h3 className="text-[10px] sm:text-[11px] font-bold text-[#312E81] font-heading mb-1">
                          Cognitive Archetypes
                        </h3>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-0.5">
                          {/* Donut Chart SVG */}
                          <div className="relative size-16 sm:size-20 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke="#312E81"
                                strokeWidth="14"
                                strokeDasharray="81.2 157.6"
                                initial={{ strokeDashoffset: 238.8 }}
                                whileInView={{ strokeDashoffset: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke="#4338CA"
                                strokeWidth="14"
                                strokeDasharray="62.1 176.7"
                                initial={{ strokeDashoffset: 238.8 }}
                                whileInView={{ strokeDashoffset: -81.2 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke="#7C3AED"
                                strokeWidth="14"
                                strokeDasharray="52.5 186.3"
                                initial={{ strokeDashoffset: 238.8 }}
                                whileInView={{ strokeDashoffset: -143.3 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke="#10B981"
                                strokeWidth="14"
                                strokeDasharray="43.0 195.8"
                                initial={{ strokeDashoffset: 238.8 }}
                                whileInView={{ strokeDashoffset: -195.8 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              />
                            </svg>

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                              <span className="text-xs sm:text-sm font-extrabold text-[#312E81] leading-none font-heading">
                                <AnimatedNumber value={1840} duration={1.6} />
                              </span>
                              <span className="text-[7px] text-slate-400 font-medium mt-0.5">
                                Assessed
                              </span>
                            </div>
                          </div>

                          {/* Legend List */}
                          <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 w-full sm:w-auto sm:flex-1 pl-0 sm:pl-1.5">
                            {PSYCHO_SEGMENTS.map((s) => (
                              <div key={s.name} className="flex items-center justify-between text-[8.5px] sm:text-[9.5px]">
                                <div className="flex items-center gap-1 truncate">
                                  <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                  <span className="text-slate-700 truncate font-medium">{s.name}</span>
                                </div>
                                <span className="text-slate-800 font-bold ml-1 font-mono">{s.percent}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section: Top Psychometric Candidates + Verified Logs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 sm:gap-2">
                      {/* Left: Top Evaluated Candidates */}
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                          <h3 className="text-[10px] sm:text-[11px] font-bold text-[#312E81] font-heading">
                            Top Evaluated Profiles
                          </h3>
                          <button type="button" className="text-[9px] font-semibold text-slate-700 hover:text-[#312E81] cursor-pointer">
                            View all
                          </button>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          {[
                            {
                              name: "Rohan Verma",
                              archetype: "Strategic Catalyst • Deductive 98%",
                              score: "98.4%",
                              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                            },
                            {
                              name: "Sneha Iyer",
                              archetype: "Systematic Thinker • Agility 97%",
                              score: "97.2%",
                              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
                            },
                            {
                              name: "Arjun Mehta",
                              archetype: "Adaptive Innovator • Speed 96%",
                              score: "96.8%",
                              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                            },
                          ].map((c, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-1.5">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <img
                                  src={c.avatar}
                                  alt={c.name}
                                  className="size-5 sm:size-6 rounded-full object-cover border border-slate-100 shrink-0"
                                />
                                <div className="truncate">
                                  <div className="text-[9.5px] sm:text-[10px] font-bold text-[#312E81] truncate">
                                    {c.name}
                                  </div>
                                  <div className="text-[8px] text-slate-400 truncate">
                                    {c.archetype}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="text-[9.5px] sm:text-[10px] font-bold text-[#312E81] font-mono">{c.score}</span>
                                <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200/50">
                                  Tier 1
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Recent Psychometric Assessment Events */}
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                          <h3 className="text-[10px] sm:text-[11px] font-bold text-[#312E81] font-heading">
                            Recent Assessment Signals
                          </h3>
                          <span className="text-[9px] font-semibold text-slate-500">Live Stream</span>
                        </div>

                        <div className="space-y-1 sm:space-y-1.5">
                          {[
                            {
                              icon: Brain,
                              title: "Cognitive Battery completed by Vikram S.",
                              time: "2 min ago",
                            },
                            {
                              icon: Sparkles,
                              title: "Situational Judgment evaluation scored (96%)",
                              time: "8 min ago",
                            },
                            {
                              icon: CheckCircle2,
                              title: "Archetype mapped: Strategic Architect",
                              time: "15 min ago",
                            },
                            {
                              icon: Target,
                              title: "Team Cultural Alignment matrix generated",
                              time: "27 min ago",
                            },
                          ].map((ev, idx) => {
                            const Icon = ev.icon;
                            return (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs py-0.5"
                              >
                                <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
                                  <div className="size-4.5 sm:size-5 rounded-md border border-slate-200/90 flex items-center justify-center text-slate-600 bg-white shrink-0">
                                    <Icon className="size-2 sm:size-2.5 text-[#312E81]" />
                                  </div>
                                  <span className="text-[9px] sm:text-[9.5px] font-medium text-slate-800 truncate">{ev.title}</span>
                                </div>
                                <span className="text-[8px] text-slate-400 font-normal shrink-0 ml-1.5">{ev.time}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ========================================================== */
                  /* DEFAULT DASHBOARD WORKSPACE (MATCHING USER REFERENCE IMAGE) */
                  /* ========================================================== */
                  <>
                    {/* 4 Metric / KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2">
                      {[
                        {
                          label: "Active Learners",
                          numValue: 12480,
                          suffix: "",
                          change: "↑ 12%",
                          icon: Users,
                          path: "M 0 28 C 20 28, 35 12, 60 16 C 85 20, 105 8, 130 12 C 155 16, 175 4, 200 6",
                        },
                        {
                          label: "Assessments",
                          numValue: 8320,
                          suffix: "",
                          change: "↑ 18%",
                          icon: FileText,
                          path: "M 0 26 C 25 24, 40 16, 65 20 C 90 24, 110 8, 140 14 C 165 20, 180 6, 200 4",
                        },
                        {
                          label: "Shortlisted",
                          numValue: 1240,
                          suffix: "",
                          change: "↑ 22%",
                          icon: UserCheck,
                          path: "M 0 30 C 25 30, 45 18, 70 22 C 95 26, 120 10, 150 16 C 175 22, 185 8, 200 4",
                        },
                        {
                          label: "Conversion",
                          numValue: 68,
                          suffix: "%",
                          change: "↑ 16%",
                          icon: Briefcase,
                          path: "M 0 28 C 30 26, 50 14, 80 18 C 110 22, 130 8, 160 12 C 180 16, 190 6, 200 4",
                        },
                      ].map((card, i) => {
                        const Icon = card.icon;
                        return (
                          <div
                            key={i}
                            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between relative overflow-hidden"
                          >
                            <div>
                              <div className="flex items-center gap-1 text-slate-600 mb-0.5">
                                <Icon className="size-2.5 sm:size-3 text-[#312E81] shrink-0" />
                                <span className="text-[8.5px] sm:text-[9.5px] font-medium text-slate-600 truncate">{card.label}</span>
                              </div>
                              <div className="flex items-baseline justify-between gap-1 flex-wrap">
                                <span className="text-xs sm:text-base lg:text-lg font-extrabold text-[#312E81] font-heading">
                                  <AnimatedNumber value={card.numValue} suffix={card.suffix} duration={1.6} />
                                </span>
                                <span className="text-[7.5px] sm:text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded-full border border-emerald-200/50">
                                  {card.change}
                                </span>
                              </div>
                            </div>

                            {/* Sparkline Graphic */}
                            <div className="w-full h-4 sm:h-5 mt-0.5 -mb-0.5">
                              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 36" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id={`sparkGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                                  </linearGradient>
                                </defs>
                                <motion.path
                                  d={`${card.path} L 200 36 L 0 36 Z`}
                                  fill={`url(#sparkGrad-${i})`}
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: false, amount: 0.2 }}
                                  transition={{ duration: 0.8, delay: i * 0.1 }}
                                />
                                <motion.path
                                  d={card.path}
                                  fill="none"
                                  stroke="#7C3AED"
                                  strokeWidth="1.75"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: false, amount: 0.2 }}
                                  transition={{ duration: 1.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                />
                              </svg>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Middle Charts Section (Learning Progress + Skill Distribution) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-1.5 sm:gap-2">
                      {/* Left Chart: Learning Progress (7 Cols) */}
                      <div className="lg:col-span-7 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                          <h3 className="text-[10px] sm:text-[11px] font-bold text-[#312E81] font-heading">
                            Learning Progress
                          </h3>
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-slate-200/90 text-[8px] sm:text-[9px] font-semibold text-slate-600 bg-white">
                            <span>Last 6 months</span>
                            <ChevronDown className="size-2 text-slate-400" />
                          </div>
                        </div>

                        {/* Chart Area */}
                        <div className="relative w-full h-[85px] sm:h-[105px]">
                          {/* Floating Tooltip Indicator on Apr Peak */}
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.85 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-1 left-[60%] sm:left-[64%] -translate-x-1/2 z-10 flex flex-col items-center"
                          >
                            <div className="px-1.5 py-0.5 rounded bg-[#312E81] text-white text-[8px] font-bold shadow-xs flex items-center gap-0.5">
                              <User className="size-2 text-[#10B981]" />
                              <span>
                                <AnimatedNumber value={82} suffix="%" duration={1.6} />
                              </span>
                            </div>
                            <div className="w-1 h-1 bg-[#312E81] rotate-45 -mt-0.5" />
                            <div className="w-[1px] h-10 sm:h-12 border-l border-dashed border-[#312E81]/50 mt-0.5" />
                          </motion.div>

                          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 140" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="areaProgressGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.45" />
                                <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.08" />
                                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>

                            {/* Y-Axis Horizontal Grid Lines */}
                            <line x1="30" y1="15" x2="490" y2="15" stroke="#F1F5F9" strokeWidth="1" />
                            <line x1="30" y1="45" x2="490" y2="45" stroke="#F1F5F9" strokeWidth="1" />
                            <line x1="30" y1="75" x2="490" y2="75" stroke="#F1F5F9" strokeWidth="1" />
                            <line x1="30" y1="105" x2="490" y2="105" stroke="#F1F5F9" strokeWidth="1" />
                            <line x1="30" y1="135" x2="490" y2="135" stroke="#E2E8F0" strokeWidth="1" />

                            {/* Y-Axis Labels */}
                            <text x="10" y="18" fill="#94A3B8" fontSize="8" textAnchor="middle">100</text>
                            <text x="10" y="48" fill="#94A3B8" fontSize="8" textAnchor="middle">75</text>
                            <text x="10" y="78" fill="#94A3B8" fontSize="8" textAnchor="middle">50</text>
                            <text x="10" y="108" fill="#94A3B8" fontSize="8" textAnchor="middle">25</text>
                            <text x="10" y="138" fill="#94A3B8" fontSize="8" textAnchor="middle">0</text>

                            {/* Filled Gradient Area Under Curve */}
                            <motion.path
                              d="M 40 105 C 80 105, 120 75, 180 78 C 240 80, 270 25, 320 25 C 370 25, 410 48, 480 20 L 480 135 L 40 135 Z"
                              fill="url(#areaProgressGrad)"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: false, amount: 0.3 }}
                              transition={{ duration: 1.2, delay: 0.3 }}
                            />

                            {/* Violet Trend Line */}
                            <motion.path
                              d="M 40 105 C 80 105, 120 75, 180 78 C 240 80, 270 25, 320 25 C 370 25, 410 48, 480 20"
                              fill="none"
                              stroke="#7C3AED"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: false, amount: 0.3 }}
                              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                            />

                            {/* Data Points */}
                            <motion.circle
                              cx="40"
                              cy="105"
                              r="3"
                              fill="#7C3AED"
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            <motion.circle
                              cx="320"
                              cy="25"
                              r="3.5"
                              fill="#10B981"
                              stroke="#312E81"
                              strokeWidth="1.5"
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: [0, 1.3, 1], opacity: 1 }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.5, delay: 1.0 }}
                            />
                            <motion.circle
                              cx="480"
                              cy="20"
                              r="3.5"
                              fill="#10B981"
                              stroke="#312E81"
                              strokeWidth="1.5"
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: [0, 1.3, 1], opacity: 1 }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.5, delay: 1.5 }}
                            />
                          </svg>
                        </div>

                        {/* X-Axis Month Labels */}
                        <div className="flex justify-between text-[8px] sm:text-[9px] text-slate-400 px-4 pt-0.5 font-medium">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                        </div>
                      </div>

                      {/* Right Chart: Skill Distribution (5 Cols) */}
                      <div className="lg:col-span-5 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <h3 className="text-[10px] sm:text-[11px] font-bold text-[#312E81] font-heading mb-1">
                          Skill Distribution
                        </h3>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-0.5">
                          {/* Donut Chart SVG */}
                          <div className="relative size-16 sm:size-20 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke="#312E81"
                                strokeWidth="14"
                                strokeDasharray="66.8 172.0"
                                initial={{ strokeDashoffset: 238.8 }}
                                whileInView={{ strokeDashoffset: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke="#4338CA"
                                strokeWidth="14"
                                strokeDasharray="52.5 186.3"
                                initial={{ strokeDashoffset: 238.8 }}
                                whileInView={{ strokeDashoffset: -66.8 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke="#7C3AED"
                                strokeWidth="14"
                                strokeDasharray="43.0 195.8"
                                initial={{ strokeDashoffset: 238.8 }}
                                whileInView={{ strokeDashoffset: -119.3 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke="#10B981"
                                strokeWidth="14"
                                strokeDasharray="38.2 200.6"
                                initial={{ strokeDashoffset: 238.8 }}
                                whileInView={{ strokeDashoffset: -162.3 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke="#A7F3D0"
                                strokeWidth="14"
                                strokeDasharray="38.2 200.6"
                                initial={{ strokeDashoffset: 238.8 }}
                                whileInView={{ strokeDashoffset: -200.5 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              />
                            </svg>

                            {/* Donut Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                              <span className="text-xs sm:text-sm font-extrabold text-[#312E81] leading-none font-heading">
                                <AnimatedNumber value={2840} duration={1.6} />
                              </span>
                              <span className="text-[7px] text-slate-400 font-medium mt-0.5">
                                Participants
                              </span>
                            </div>
                          </div>

                          {/* Legend List (2 cols on mobile) */}
                          <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 w-full sm:w-auto sm:flex-1 pl-0 sm:pl-1.5">
                            {SKILL_SEGMENTS.map((s) => (
                              <div key={s.name} className="flex items-center justify-between text-[8.5px] sm:text-[9.5px]">
                                <div className="flex items-center gap-1 truncate">
                                  <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                  <span className="text-slate-700 truncate font-medium">{s.name}</span>
                                </div>
                                <span className="text-slate-800 font-bold ml-1 font-mono">{s.percent}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section (Top Performing Learners + Recent Activity) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 sm:gap-2">
                      {/* Left: Top Performing Learners */}
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                          <h3 className="text-[10px] sm:text-[11px] font-bold text-[#312E81] font-heading">
                            Top Performing Learners
                          </h3>
                          <button type="button" className="text-[9px] font-semibold text-slate-700 hover:text-[#312E81] cursor-pointer">
                            View all
                          </button>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          {LEARNERS.map((learner, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-1.5">
                              {/* Avatar & Name */}
                              <div className="flex items-center gap-1.5 min-w-0">
                                <div className="size-5 sm:size-6 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-100">
                                  <img
                                    src={learner.avatar}
                                    alt={learner.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = "none";
                                    }}
                                  />
                                </div>
                                <div className="truncate">
                                  <div className="text-[9.5px] sm:text-[10px] font-bold text-[#312E81] truncate">
                                    {learner.name}
                                  </div>
                                  <div className="text-[8px] text-slate-400 truncate">
                                    {learner.role}
                                  </div>
                                </div>
                              </div>

                              {/* Progress Bar (Desktop / tablet only) */}
                              <div className="flex-1 max-w-[80px] sm:max-w-[100px] h-1 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                                <motion.div
                                  className="h-full bg-[#312E81] rounded-full"
                                  initial={isMobile ? false : { width: 0 }}
                                  whileInView={isMobile ? undefined : { width: learner.score }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
                                />
                              </div>

                              {/* Score & Gain Badge */}
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="text-[9.5px] sm:text-[10px] font-bold text-[#312E81] font-mono">{learner.score}</span>
                                <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200/50">
                                  {learner.gain}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Recent Activity */}
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                          <h3 className="text-[10px] sm:text-[11px] font-bold text-[#312E81] font-heading">
                            Recent Activity
                          </h3>
                          <button type="button" className="text-[9px] font-semibold text-slate-700 hover:text-[#312E81] cursor-pointer">
                            View all
                          </button>
                        </div>

                        <div className="space-y-1 sm:space-y-1.5">
                          {[
                            {
                              icon: FileText,
                              title: "New assessment completed",
                              time: "5 min ago",
                            },
                            {
                              icon: Brain,
                              title: "Psychometric battery: High Cognitive Score",
                              time: "9 min ago",
                            },
                            {
                              icon: UserCheck,
                              title: "Candidate shortlisted for Fintech role",
                              time: "14 min ago",
                            },
                            {
                              icon: BookOpen,
                              title: "Adaptive learning path assigned",
                              time: "21 min ago",
                            },
                          ].map((activity, idx) => {
                            const Icon = activity.icon;
                            return (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs py-0.5"
                              >
                                <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
                                  <div className="size-4.5 sm:size-5 rounded-md border border-slate-200/90 flex items-center justify-center text-slate-600 bg-white shrink-0">
                                    <Icon className="size-2 sm:size-2.5 text-[#312E81]" />
                                  </div>
                                  <span className="text-[9px] sm:text-[9.5px] font-medium text-slate-800 truncate">{activity.title}</span>
                                </div>
                                <span className="text-[8px] text-slate-400 font-normal shrink-0 ml-1.5">{activity.time}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </main>
            </div>
          </div>
        </div>

        {/* Laptop Chassis Bottom Base Lip (Metallic Space Gray Stand with Notch) */}
        <div className="relative bg-gradient-to-b from-[#2B334B] to-[#171D2F] h-2.5 sm:h-3.5 rounded-b-[10px] sm:rounded-b-[16px] shadow-[0_10px_20px_rgba(15,23,42,0.3)] border-t border-[#3B4668] flex items-center justify-center shrink-0">
          {/* Thumb Opening Notch */}
          <div className="w-14 sm:w-20 h-0.5 sm:h-1 bg-[#0F1422] rounded-b-sm" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroMockup;
