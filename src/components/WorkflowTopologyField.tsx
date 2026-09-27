"use client";

import React, { useState, useEffect, useRef, useId, useMemo } from "react";
import {
  GraduationCap,
  Landmark,
  Building2,
  Users,
  Code2,
  Building,
  UserCheck,
} from "lucide-react";

export interface WorkflowTopologyProps {
  className?: string;
  speed?: number;
  interactive?: boolean;
}

interface PipelineNode {
  id: string;
  title: string;
  subtitle: string;
  stage: "education" | "events" | "hiring";
  x: number; // 0 to 1
  y: number; // 0 to 1
  status: "completed" | "active" | "ready";
  icon: React.ComponentType<{ className?: string }>;
  primary?: boolean;
}

interface Connection {
  from: string;
  to: string;
  active?: boolean;
}

const NODES: PipelineNode[] = [
  // 1. Colleges (Top-Left Source)
  {
    id: "colleges",
    title: "Colleges",
    subtitle: "Universities & Campus",
    stage: "education",
    x: 0.10,
    y: 0.25,
    status: "completed",
    icon: Landmark,
    primary: false,
  },
  // 2. Students (Upper-Left Flank, fed by Colleges)
  {
    id: "students",
    title: "Students",
    subtitle: "Campus Tech Talent",
    stage: "education",
    x: 0.24,
    y: 0.15,
    status: "completed",
    icon: GraduationCap,
    primary: true,
  },
  // 3. Institutes (Bottom-Left Source)
  {
    id: "institutes",
    title: "Institutes",
    subtitle: "Training & Academies",
    stage: "education",
    x: 0.10,
    y: 0.74,
    status: "completed",
    icon: Building2,
    primary: false,
  },
  // 4. Learners (Lower-Left Flank, trained by Institutes)
  {
    id: "learners",
    title: "Learners",
    subtitle: "Skill Upskilling & DSA",
    stage: "education",
    x: 0.25,
    y: 0.84,
    status: "active",
    icon: Users,
    primary: true,
  },

  // 5. Live Coding Events (Upper-Right Central Engine)
  {
    id: "live_events",
    title: "Live Coding Events",
    subtitle: "Hackathons & Challenges",
    stage: "events",
    x: 0.74,
    y: 0.15,
    status: "active",
    icon: Code2,
    primary: true,
  },

  // 6. Companies (Mid-Right Demand Partner)
  {
    id: "companies",
    title: "Companies",
    subtitle: "Direct Tech Hiring",
    stage: "hiring",
    x: 0.89,
    y: 0.32,
    status: "completed",
    icon: Building,
    primary: true,
  },
  // 7. Recruitment Agencies (Bottom-Right Talent Matcher)
  {
    id: "agencies",
    title: "Recruitment Agencies",
    subtitle: "Talent Discovery & Placement",
    stage: "hiring",
    x: 0.87,
    y: 0.76,
    status: "completed",
    icon: UserCheck,
    primary: false,
  },
];

const CONNECTIONS: Connection[] = [
  // Education & Talent Preparation
  { from: "colleges", to: "students", active: true },
  { from: "colleges", to: "institutes" },
  { from: "institutes", to: "learners", active: true },

  // Engagement & Performance Verification (Connecting to Live Coding Events)
  { from: "students", to: "live_events", active: true },
  { from: "learners", to: "live_events", active: true },

  // Lower Bridge (Learners & Institutes to Recruitment Agencies)
  { from: "learners", to: "agencies", active: true },

  // Demand & Placement (Live Coding Events & Agencies to Companies)
  { from: "live_events", to: "companies", active: true },
  { from: "live_events", to: "agencies", active: true },
  { from: "agencies", to: "companies" },
];

export const WorkflowTopologyField: React.FC<WorkflowTopologyProps> = ({
  className = "",
  speed = 1,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 680 });
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  // Measure container dimensions with ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      if (el) {
        setDimensions({
          width: el.clientWidth || 1200,
          height: el.clientHeight || 680,
        });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Handle pointer tracking for interactive spotlight & node elevation
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointerLeave = () => {
    setMousePos(null);
  };

  // Convert normalized 0..1 coordinates to actual pixel positions
  const nodeCoords = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    NODES.forEach((n) => {
      map.set(n.id, {
        x: n.x * dimensions.width,
        y: n.y * dimensions.height,
      });
    });
    return map;
  }, [dimensions]);

  // Compute deeply curved, silky Bezier paths for each connection
  const paths = useMemo(() => {
    return CONNECTIONS.map((c, index) => {
      const from = nodeCoords.get(c.from);
      const to = nodeCoords.get(c.to);
      if (!from || !to) return null;

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const absDx = Math.abs(dx);

      let pathString = "";

      // 1. Vertical flank bracket connections (colleges -> institutes on left, or agencies -> companies on right)
      if (absDx < 120) {
        const isLeft = from.x < dimensions.width * 0.5;
        // Deep outward bow of 85px creating an organic framing bracket
        const bow = isLeft ? -85 : 85;
        const c1x = from.x + bow;
        const c1y = from.y + dy * 0.3;
        const c2x = to.x + bow;
        const c2y = to.y - dy * 0.3;
        pathString = `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
      }
      // 2. Upper arched bridge (students -> live_events across the top)
      else if (from.y < dimensions.height * 0.32 && to.y < dimensions.height * 0.32) {
        // Pronounced upward arch (60px high) curving gracefully over the center headline & badge
        const arch = 60;
        const c1x = from.x + dx * 0.35;
        const c1y = from.y - arch;
        const c2x = to.x - dx * 0.35;
        const c2y = to.y - arch;
        pathString = `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
      }
      // 3. Lower sweeping bridge (learners -> agencies across the bottom)
      else if (from.y > dimensions.height * 0.65 && to.y > dimensions.height * 0.65) {
        // Pronounced downward swoop (58px deep) curving under the CTA button & counter
        const swoop = 58;
        const c1x = from.x + dx * 0.35;
        const c1y = from.y + swoop;
        const c2x = to.x - dx * 0.35;
        const c2y = to.y + swoop;
        pathString = `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
      }
      // 4. Inter-tier flowing S-curves (e.g. colleges -> students, institutes -> learners, live_events -> companies)
      else {
        // Generous horizontal pull (70% of dx, min 85px) for deeply curved, silky S-lines
        const curvePull = Math.max(absDx * 0.7, 85);
        const c1x = from.x + curvePull;
        const c1y = from.y;
        const c2x = to.x - curvePull;
        const c2y = to.y;
        pathString = `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
      }

      return {
        id: `${c.from}->${c.to}-${index}`,
        d: pathString,
        fromId: c.from,
        toId: c.to,
        active: c.active,
      };
    }).filter(Boolean) as { id: string; d: string; fromId: string; toId: string; active?: boolean }[];
  }, [nodeCoords, dimensions]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Atmospheric Ambient Lighting: Violet Glows & Soft Indigo Stage */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] bg-gradient-to-tr from-[#7C3AED]/15 via-[#EDE9FE]/35 to-[#312E81]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-[5%] w-[380px] h-[380px] bg-[#10B981]/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-[5%] w-[420px] h-[420px] bg-[#312E81]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* 2. Interactive Cursor Ambient Spotlight */}
      {mousePos && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 -z-10"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-50%, -50%)",
            width: "360px",
            height: "360px",
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, rgba(49, 46, 129, 0.03) 50%, transparent 75%)",
          }}
        />
      )}

      {/* 3. SVG Network Field (Bezier Edges, Flowing Pulses, Stream Lines) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 md:opacity-100 transition-opacity"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Edge gradient */}
          <linearGradient id={`streamGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#312E81" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
          </linearGradient>

          {/* Pulse Glow Filter */}
          <filter id={`goldGlow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Static Background Curves */}
        {paths.map((p) => {
          const isHot = hoveredNode === p.fromId || hoveredNode === p.toId;
          return (
            <path
              key={`base-${p.id}`}
              d={p.d}
              fill="none"
              stroke={isHot ? "#312E81" : "#E2E8F0"}
              strokeWidth={isHot ? 2 : 1.5}
              strokeOpacity={isHot ? 0.45 : 0.8}
              strokeDasharray={p.active ? undefined : "4 4"}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Animated Active Flow Streams */}
        {paths.map((p, idx) => {
          if (!p.active) return null;
          return (
            <g key={`active-${p.id}`}>
              {/* Animated Dashed Stream Line */}
              <path
                d={p.d}
                fill="none"
                stroke="#7C3AED"
                strokeWidth={2.4}
                strokeDasharray="6 14"
                strokeLinecap="round"
                className="animate-flow-dash"
                style={{
                  animationDuration: `${3 / speed}s`,
                }}
              />

              {/* Glowing Traveling Comet Signal */}
              <circle r="3.5" fill="#312E81" stroke="#10B981" strokeWidth="2" filter={`url(#goldGlow-${uid})`}>
                <animateMotion
                  path={p.d}
                  dur={`${4.2 / speed}s`}
                  begin={`${idx * 0.8}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* 5. Render Interactive Pipeline Node Cards */}
      {NODES.map((node) => {
        const coords = nodeCoords.get(node.id);
        if (!coords) return null;

        const Icon = node.icon;
        const isActive = node.status === "active";
        const isHovered = hoveredNode === node.id;

        return (
          <div
            key={node.id}
            onPointerEnter={() => setHoveredNode(node.id)}
            onPointerLeave={() => setHoveredNode(null)}
            className="absolute transition-all duration-300 cursor-pointer pointer-events-auto hidden md:flex"
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Pulsing Active Ring for Active Nodes */}
            {isActive && (
              <div className="absolute -inset-1.5 rounded-2xl border border-[#7C3AED] animate-ping opacity-30 pointer-events-none" />
            )}

            {/* Node Card Shell */}
            <div
              className={`flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-white/95 backdrop-blur-md border transition-all duration-300 shadow-xs ${isHovered
                  ? "border-[#312E81] shadow-[0_8px_25px_rgba(49,46,129,0.15)] scale-105 -translate-y-0.5"
                  : isActive
                    ? "border-[#7C3AED] shadow-[0_6px_20px_rgba(124,58,237,0.22)]"
                    : "border-slate-200/90 hover:border-slate-300"
                }`}
            >
              {/* Icon Chip */}
              <div
                className={`size-6 sm:size-7.5 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive
                    ? "bg-[#7C3AED] text-white"
                    : node.status === "completed"
                      ? "bg-[#312E81]/5 text-[#312E81]"
                      : "bg-slate-100 text-slate-500"
                  }`}
              >
                <Icon className="size-3 sm:size-4" />
              </div>

              {/* Text Info */}
              <div className="text-left whitespace-nowrap">
                <div className="text-[11px] sm:text-xs font-bold text-[#312E81] font-heading tracking-tight">
                  {node.title}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-sans hidden sm:block">
                  {node.subtitle}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* 6. Soft Center Scrim to ensure Hero Headline & CTA Readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 48%, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.75) 45%, rgba(255, 255, 255, 0.1) 85%, transparent 100%)",
        }}
      />

      {/* Keyframe animation for dashed stream */}
      <style jsx>{`
        @keyframes flowDash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-flow-dash {
          animation: flowDash 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WorkflowTopologyField;
