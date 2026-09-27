"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Target,
  Compass,
  Code2,
  Award,
  Briefcase,
  Users,
  BookOpen,
  Laptop,
  ShieldCheck,
  BarChart3,
  Terminal,
  Search,
  BrainCircuit,
  FileCheck,
  UserCheck,
  Sparkles,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ServiceHealth = "healthy" | "degraded" | "error";

export type ServiceIcon =
  | "target"
  | "compass"
  | "code"
  | "brain"
  | "award"
  | "briefcase"
  | "users"
  | "book"
  | "laptop"
  | "shield"
  | "chart"
  | "terminal"
  | "search"
  | "filecheck"
  | "usercheck"
  | "sparkles";

export interface ServiceData {
  id: string;
  x: number; // 0 to 1
  y: number; // 0 to 1
  health?: ServiceHealth;
  region?: string;
  label?: string;
  icon?: ServiceIcon;
  tier?: "primary" | "secondary";
}

export interface ConnectionData {
  from: string;
  to: string;
  activity?: number;
}

export interface PersonaSignalMapProps {
  persona: "learners" | "institutions" | "enterprises";
  className?: string;
  interactive?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Math Helpers & Deterministic RNG                                           */
/* -------------------------------------------------------------------------- */

function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const smoothstep = (t: number) => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};
const TAU = Math.PI * 2;

function withAlpha(color: string, a: number): string {
  const v = Math.max(0, Math.min(1, a));
  const c = color.trim();
  if (c.startsWith("#")) {
    let h = c.slice(1);
    if (h.length === 3) h = h.split("").map((d) => d + d).join("");
    const n = parseInt(h.slice(0, 6), 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${v})`;
  }
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean).slice(0, 3);
    if (parts.length === 3) return `rgba(${parts.join(", ")}, ${v})`;
  }
  return c;
}

/* -------------------------------------------------------------------------- */
/* Desktop Topologies                                                         */
/* -------------------------------------------------------------------------- */

export function getDesktopTopology(persona: "learners" | "institutions" | "enterprises"): {
  services: ServiceData[];
  connections: ConnectionData[];
} {
  if (persona === "learners") {
    return {
      services: [
        { id: "goals", x: 0.08, y: 0.50, health: "healthy", label: "Set Your Goals", icon: "target", tier: "primary" },
        { id: "path", x: 0.24, y: 0.65, health: "healthy", label: "AI Prepare Path", icon: "compass", tier: "primary" },
        { id: "psycho", x: 0.41, y: 0.35, health: "healthy", label: "Cognitive Matrix", icon: "brain", tier: "primary" },
        { id: "sandbox", x: 0.58, y: 0.65, health: "healthy", label: "Sandbox & Learn", icon: "code", tier: "primary" },
        { id: "showcase", x: 0.75, y: 0.35, health: "healthy", label: "Showcase Skills", icon: "award", tier: "primary" },
        { id: "hired", x: 0.92, y: 0.50, health: "healthy", label: "Get Hired", icon: "briefcase", tier: "primary" },
      ],
      connections: [
        { from: "goals", to: "path", activity: 1.3 },
        { from: "path", to: "psycho", activity: 0.8 },
        { from: "psycho", to: "sandbox", activity: 1.4 },
        { from: "sandbox", to: "showcase", activity: 1.0 },
        { from: "showcase", to: "hired", activity: 1.5 },
      ],
    };
  }

  if (persona === "institutions") {
    return {
      services: [
        { id: "cohorts", x: 0.08, y: 0.50, health: "healthy", label: "Create Cohorts", icon: "users", tier: "primary" },
        { id: "assign", x: 0.28, y: 0.35, health: "healthy", label: "Assign Paths", icon: "book", tier: "primary" },
        { id: "exams", x: 0.50, y: 0.65, health: "healthy", label: "Schedule Exams", icon: "laptop", tier: "primary" },
        { id: "proctor", x: 0.72, y: 0.35, health: "healthy", label: "Live AI Proctor", icon: "shield", tier: "primary" },
        { id: "results", x: 0.92, y: 0.50, health: "healthy", label: "AI Result Analysis", icon: "chart", tier: "primary" },
      ],
      connections: [
        { from: "cohorts", to: "assign", activity: 1.2 },
        { from: "assign", to: "exams", activity: 1.3 },
        { from: "exams", to: "proctor", activity: 1.4 },
        { from: "proctor", to: "results", activity: 1.5 },
      ],
    };
  }

  // enterprises
  return {
    services: [
      { id: "sprints", x: 0.08, y: 0.50, health: "healthy", label: "Custom Sprints", icon: "terminal", tier: "primary" },
      { id: "profiles", x: 0.28, y: 0.35, health: "healthy", label: "Matched Profiles", icon: "search", tier: "primary" },
      { id: "psycho", x: 0.50, y: 0.65, health: "healthy", label: "Psychometric Data", icon: "brain", tier: "primary" },
      { id: "shortlist", x: 0.72, y: 0.35, health: "healthy", label: "Shortlist Talent", icon: "filecheck", tier: "primary" },
      { id: "hire", x: 0.92, y: 0.50, health: "healthy", label: "Hire Verified", icon: "usercheck", tier: "primary" },
    ],
    connections: [
      { from: "sprints", to: "profiles", activity: 1.3 },
      { from: "profiles", to: "psycho", activity: 1.4 },
      { from: "psycho", to: "shortlist", activity: 1.3 },
      { from: "shortlist", to: "hire", activity: 1.6 },
    ],
  };
}

/* -------------------------------------------------------------------------- */
/* Models & Geometry                                                          */
/* -------------------------------------------------------------------------- */

interface EdgeModel {
  fromId: string;
  toId: string;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
  rate: number;
  phase: number;
}

interface NodeModel {
  id: string;
  x: number;
  y: number;
  label?: string;
  icon?: ServiceIcon;
}

interface CometPathSegment {
  edge: EdgeModel;
  length: number;
}

interface PipelineModel {
  nodes: Map<string, NodeModel>;
  order: string[];
  edges: EdgeModel[];
  activePath: string[];
  cometSegments: CometPathSegment[];
  cometTotalLength: number;
}

function bezierPoint(e: EdgeModel, t: number): [number, number] {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    a * e.ax + b * e.c1x + c * e.c2x + d * e.bx,
    a * e.ay + b * e.c1y + c * e.c2y + d * e.by,
  ];
}

function buildModel(services: ServiceData[], connections: ConnectionData[], seed: number): PipelineModel {
  const rng = makeRng((seed >>> 0) * 0x9e3779b1 + 0x85);
  const nodes = new Map<string, NodeModel>();
  services.forEach((s) => {
    nodes.set(s.id, {
      id: s.id,
      x: clamp(s.x, 0, 1),
      y: clamp(s.y, 0, 1),
      label: s.label,
      icon: s.icon,
    });
  });
  const order = services.map((s) => s.id);

  const rawEdges: EdgeModel[] = [];
  connections.forEach((c) => {
    const a = nodes.get(c.from);
    const b = nodes.get(c.to);
    if (!a || !b) return;

    const dx = b.x - a.x;

    rawEdges.push({
      fromId: c.from,
      toId: c.to,
      ax: a.x,
      ay: a.y,
      bx: b.x,
      by: b.y,
      c1x: a.x + dx * 0.5,
      c1y: a.y,
      c2x: a.x + dx * 0.5,
      c2y: b.y,
      rate: clamp(c.activity ?? 1, 0.6, 2),
      phase: rng(),
    });
  });

  // Pre-calculate comet track segments directly from connections chain
  const cometSegments: CometPathSegment[] = [];
  let cometTotalLength = 0;

  connections.forEach((c) => {
    const edge = rawEdges.find((ed) => ed.fromId === c.from && ed.toId === c.to);
    if (edge) {
      // Measure normalized length with 16 point samples
      let segLen = 0;
      let prev = bezierPoint(edge, 0);
      for (let s = 1; s <= 16; s++) {
        const cur = bezierPoint(edge, s / 16);
        segLen += Math.hypot(cur[0] - prev[0], cur[1] - prev[1]);
        prev = cur;
      }
      cometSegments.push({ edge, length: segLen });
      cometTotalLength += segLen;
    }
  });

  const activePath = connections.length > 0
    ? [connections[0].from, ...connections.map((c) => c.to)]
    : services.map((s) => s.id);

  return { nodes, order, edges: rawEdges, activePath, cometSegments, cometTotalLength: cometTotalLength || 1 };
}

/* -------------------------------------------------------------------------- */
/* Authentic Vector SVG Paths (Standard 24x24 viewBox)                       */
/* -------------------------------------------------------------------------- */

const SVG_ICON_PATHS: Record<string, string> = {
  target:
    "M 22 12 a 10 10 0 1 0 -20 0 a 10 10 0 1 0 20 0 M 18 12 a 6 6 0 1 0 -12 0 a 6 6 0 1 0 12 0 M 14 12 a 2 2 0 1 0 -4 0 a 2 2 0 1 0 4 0",
  compass:
    "M 22 12 a 10 10 0 1 0 -20 0 a 10 10 0 1 0 20 0 M 16.24 7.76 l -2.12 6.36 -6.36 2.12 2.12 -6.36 6.36 -2.12 Z",
  code: "M 16 18 l 6 -6 -6 -6 M 8 6 l -6 6 6 6",
  shield:
    "M 12 22 s 8 -4 8 -10 V 5 l -8 -3 -8 3 v 7 c 0 6 8 10 8 10 Z M 9 12 l 2 2 4 -4",
  award:
    "M 18 8 a 6 6 0 1 0 -12 0 a 6 6 0 1 0 12 0 M 15.4 12.8 L 18 22 l -6 -3 -6 3 2.6 -9.2",
  briefcase:
    "M 16 6 V 4 a 2 2 0 0 0 -2 -2 h -4 a 2 2 0 0 0 -2 2 v 2 M 2 7 a 2 2 0 0 1 2 -2 h 16 a 2 2 0 0 1 2 2 v 12 a 2 2 0 0 1 -2 2 H 4 a 2 2 0 0 1 -2 -2 Z M 2 13 h 20",
  brain:
    "M 12 5 a 3 3 0 1 0 -5.997 0.125 4 4 0 0 0 -2.526 5.77 4 4 0 0 0 0.556 6.588 A 4 4 0 1 0 12 18 Z M 12 5 a 3 3 0 1 1 5.997 0.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1 -0.556 6.588 A 4 4 0 1 1 12 18 Z M 12 5 v 13",
  users:
    "M 13 7 a 4 4 0 1 0 -8 0 a 4 4 0 1 0 8 0 M 17 21 v -2 a 4 4 0 0 0 -4 -4 H 5 a 4 4 0 0 0 -4 4 v 2 M 16 3.13 a 4 4 0 0 1 0 7.75 M 23 21 v -2 a 4 4 0 0 0 -3 -3.87",
  book: "M 2 3 h 6 a 4 4 0 0 1 4 4 v 14 a 3 3 0 0 0 -3 -3 H 2 Z M 22 3 h -6 a 4 4 0 0 0 -4 4 v 14 a 3 3 0 0 1 3 -3 h 7 Z",
  laptop:
    "M 20 16 V 7 a 2 2 0 0 0 -2 -2 H 6 a 2 2 0 0 0 -2 2 v 9 M 2 17 h 20 a 1 1 0 0 1 1 1 v 1 a 1 1 0 0 1 -1 1 H 2 a 1 1 0 0 1 -1 -1 v -1 a 1 1 0 0 1 1 -1 Z",
  chart: "M 3 3 v 18 h 18 M 18 17 V 9 M 13 17 V 5 M 8 17 v -3",
  terminal: "M 4 17 l 6 -6 -6 -6 M 12 19 h 8",
  search:
    "M 19 11 a 8 8 0 1 0 -16 0 a 8 8 0 1 0 16 0 M 21 21 l -4.35 -4.35",
  filecheck:
    "M 14.5 2 H 6 a 2 2 0 0 0 -2 2 v 16 a 2 2 0 0 0 2 2 h 12 a 2 2 0 0 0 2 -2 V 7.5 L 14.5 2 Z M 14 2 v 6 h 6 M 9 15 l 2 2 4 -4",
  usercheck:
    "M 16 21 v -2 a 4 4 0 0 0 -4 -4 H 6 a 4 4 0 0 0 -4 4 v 2 M 13 7 a 4 4 0 1 0 -8 0 a 4 4 0 0 0 8 0 M 16 11 l 2 2 l 4 -4",
  sparkles:
    "M 12 3 l -1.912 5.813 a 2 2 0 0 1 -1.275 1.275 L 3 12 l 5.813 1.912 a 2 2 0 0 1 1.275 1.275 L 12 21 l 1.912 -5.813 a 2 2 0 0 1 1.275 -1.275 L 21 12 l -5.813 -1.912 a 2 2 0 0 1 -1.275 -1.275 L 12 3 Z M 5 3 v 4 M 3 5 h 4 M 19 17 v 4 M 17 19 h 4",
};

let cachedPaths: Map<string, Path2D> | null = null;

function getIconPath(icon: string): Path2D {
  if (!cachedPaths) cachedPaths = new Map();
  let p = cachedPaths.get(icon);
  if (!p) {
    const d = SVG_ICON_PATHS[icon] || SVG_ICON_PATHS.target;
    p = new Path2D(d);
    cachedPaths.set(icon, p);
  }
  return p;
}

function drawIcon(ctx: CanvasRenderingContext2D, icon: ServiceIcon | undefined, boxSize: number) {
  const p = getIconPath(icon || "target");
  ctx.save();
  const targetIconSize = boxSize * 0.58;
  const scale = targetIconSize / 24;
  ctx.scale(scale, scale);
  ctx.translate(-12, -12); // Center 24x24 icon at origin
  ctx.lineWidth = 1.8 / scale;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke(p);
  ctx.restore();
}

/* -------------------------------------------------------------------------- */
/* PersonaSignalMap Component                                                 */
/* -------------------------------------------------------------------------- */

export const PersonaSignalMap: React.FC<PersonaSignalMapProps> = ({
  persona,
  className,
  interactive = true,
}) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; on: boolean }>({ x: 0.5, y: 0.5, on: false });

  const desktopRaw = useMemo(() => getDesktopTopology(persona), [persona]);
  const model = useMemo(
    () => buildModel(desktopRaw.services, desktopRaw.connections, 42),
    [desktopRaw]
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !interactive) return;
    const onMove = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      pointerRef.current = {
        x: (ev.clientX - r.left) / r.width,
        y: (ev.clientY - r.top) / r.height,
        on: true,
      };
    };
    const onLeave = () => {
      pointerRef.current.on = false;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const measure = () => {
      const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
      width = wrap.clientWidth || 1;
      height = wrap.clientHeight || 1;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    measure();

    const palette = {
      navy: "#312E81",       // Primary Deep Indigo
      navyLight: "#4338CA",  // Indigo 700
      gold: "#7C3AED",       // Electric Violet Accent
      goldMuted: "#A78BFA",  // Violet 400
      mint: "#10B981",       // Emerald Green
      slate50: "#F8FAFC",    // Clean Background
      slate200: "#E2E8F0",   // Crisp Border
      slate500: "#64748B",   // Slate Text
      surface: "#FFFFFF",    // White Card
    };

    const ambRng = makeRng(8812);
    const ambient = Array.from({ length: 24 }, () => ({
      x: ambRng(),
      y: ambRng(),
      r: 0.8 + ambRng() * 1.3,
      ph: ambRng(),
      sp: 0.2 + ambRng() * 0.4,
      isGold: ambRng() > 0.45,
    }));

    const draw = (timeSec: number) => {
      ctx.clearRect(0, 0, width, height);
      const W = width;
      const H = height;
      const s = Math.min(1.15, Math.max(0.72, W / 1000));

      const box = { x: 0.03, y: 0.08, w: 0.94, h: 0.84 };
      const PX = (x: number) => (box.x + x * box.w) * W;
      const PY = (y: number) => (box.y + y * box.h) * H;
      const project = (lx: number, ly: number): [number, number] => [PX(lx), PY(ly)];

      // 1. Stage Lighting
      const spot = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.7);
      spot.addColorStop(0, withAlpha(palette.gold, 0.06));
      spot.addColorStop(0.4, withAlpha(palette.navy, 0.02));
      spot.addColorStop(1, "transparent");
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, W, H);

      // 2. Ambient Flow Particles
      ambient.forEach((a) => {
        const drift = Math.sin(timeSec * a.sp + a.ph * TAU) * 0.015;
        const cx = a.x * W;
        const cy = (a.y + drift) * H;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(timeSec * a.sp * 1.2 + a.ph * 8));
        ctx.save();
        ctx.globalAlpha = clamp(0.25 * tw, 0, 0.55);
        ctx.fillStyle = a.isGold ? palette.gold : palette.navyLight;
        ctx.beginPath();
        ctx.arc(cx, cy, a.r * s, 0, TAU);
        ctx.fill();
        ctx.restore();
      });

      // 3. Pointer Hover Identification
      const pointer = pointerRef.current;
      let hotId: string | null = null;
      if (pointer.on) {
        let best = 0.12;
        model.nodes.forEach((n) => {
          const [npx, npy] = project(n.x, n.y);
          const d = Math.hypot(npx / W - pointer.x, npy / H - pointer.y);
          if (d < best) {
            best = d;
            hotId = n.id;
          }
        });
      }

      // 4. Connecting Edges
      model.edges.forEach((e) => {
        const [pax, pay] = project(e.ax, e.ay);
        const [pc1x, pc1y] = project(e.c1x, e.c1y);
        const [pc2x, pc2y] = project(e.c2x, e.c2y);
        const [pbx, pby] = project(e.bx, e.by);
        const isHot = hotId !== null && (e.fromId === hotId || e.toId === hotId);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pax, pay);
        ctx.bezierCurveTo(pc1x, pc1y, pc2x, pc2y, pbx, pby);
        ctx.lineWidth = 2.0 * s;
        ctx.lineCap = "round";
        ctx.strokeStyle = isHot ? palette.gold : withAlpha(palette.navyLight, 0.22);
        ctx.stroke();
        ctx.restore();
      });

      // 5. Flow Packets along edges
      model.edges.forEach((e) => {
        const prog = (e.phase + timeSec * e.rate * 0.12) % 1;
        const [nx, ny] = bezierPoint(e, prog);
        const [cx, cy] = project(nx, ny);
        ctx.save();
        ctx.fillStyle = palette.gold;
        ctx.beginPath();
        ctx.arc(cx, cy, 2.2 * s, 0, TAU);
        ctx.fill();
        ctx.restore();
      });

      // 6. Active Request Comet Traveling through Primary Stages
      const nodePulse = new Map<string, number>();

      if (model.cometSegments.length > 0) {
        const PERIOD = 6.0;
        const cycle = (timeSec / PERIOD) % 1;
        const tp = smoothstep(clamp(cycle / 0.85, 0, 1));
        const arrival = cycle > 0.85 ? clamp((cycle - 0.85) / 0.15, 0, 1) : 0;

        // Find position along cometSegments
        const targetDist = tp * model.cometTotalLength;
        let distAcc = 0;
        let cometPt: [number, number] = [0, 0];

        for (let i = 0; i < model.cometSegments.length; i++) {
          const seg = model.cometSegments[i];
          if (targetDist <= distAcc + seg.length || i === model.cometSegments.length - 1) {
            const localT = seg.length ? clamp((targetDist - distAcc) / seg.length, 0, 1) : 0;
            const normPt = bezierPoint(seg.edge, localT);
            cometPt = project(normPt[0], normPt[1]);
            break;
          }
          distAcc += seg.length;
        }

        // Pulse nodes as comet approaches
        let cum = 0;
        model.cometSegments.forEach((seg, i) => {
          const fromNodeId = seg.edge.fromId;
          const reach = cum / model.cometTotalLength;
          const d = tp - reach;
          if (d >= -0.02 && d < 0.18) {
            nodePulse.set(fromNodeId, smoothstep(1 - Math.abs(d - 0.08) / 0.1));
          }
          cum += seg.length;
          if (i === model.cometSegments.length - 1) {
            const toNodeId = seg.edge.toId;
            const endD = tp - 1;
            if (endD >= -0.05 || arrival > 0) {
              nodePulse.set(toNodeId, 1);
            }
          }
        });

        // Comet Head and Glow
        ctx.save();
        ctx.fillStyle = palette.gold;
        ctx.beginPath();
        ctx.arc(cometPt[0], cometPt[1], 3.8 * s, 0, TAU);
        ctx.fill();

        ctx.globalAlpha = 0.35;
        ctx.fillStyle = palette.goldMuted;
        ctx.beginPath();
        ctx.arc(cometPt[0], cometPt[1], 8.5 * s, 0, TAU);
        ctx.fill();
        ctx.restore();

        // Destination Ripple
        if (arrival > 0) {
          const lastEdge = model.cometSegments[model.cometSegments.length - 1].edge;
          const [lastX, lastY] = project(lastEdge.bx, lastEdge.by);
          ctx.save();
          ctx.globalAlpha = (1 - arrival) * 0.75;
          ctx.strokeStyle = "#16A34A";
          ctx.lineWidth = 2.5 * s;
          ctx.beginPath();
          ctx.arc(lastX, lastY, (8 + arrival * 26) * s, 0, TAU);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 7. Service Cards (Clean Title-only cards without sub-status)
      model.order.forEach((id) => {
        const n = model.nodes.get(id);
        if (!n) return;
        const [cx, cy] = project(n.x, n.y);
        const hot = id === hotId;
        const pulse = nodePulse.get(id) ?? 0;
        const isGoal = id === "hired" || id === "results" || id === "hire";

        ctx.font = `600 ${11 * s}px ui-sans-serif, system-ui, sans-serif`;
        const labelW = ctx.measureText(n.label ?? id).width;

        const iconBox = 24 * s;
        const padX = 10 * s;
        const gap = 8 * s;
        const contentW = padX * 2 + iconBox + gap + labelW;
        const w = Math.min(contentW, W * 0.28);
        const h = 34 * s;
        const bx = clamp(cx - w / 2, 8, W - 8 - w);
        const by = cy - h / 2;

        // Card Shadow & Glow
        ctx.save();
        ctx.shadowColor = isGoal
          ? "rgba(22, 163, 74, 0.3)"
          : pulse > 0.05 || hot
            ? "rgba(124, 58, 237, 0.35)"
            : "rgba(27, 35, 77, 0.08)";
        ctx.shadowBlur = pulse > 0.05 || hot || isGoal ? 16 * s : 6 * s;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2 * s;

        // Card Body
        ctx.beginPath();
        ctx.roundRect(bx, by, w, h, 10 * s);
        ctx.fillStyle = palette.surface;
        ctx.fill();

        ctx.shadowColor = "transparent";
        ctx.lineWidth = (pulse > 0.1 || hot || isGoal ? 2 : 1.2) * s;
        ctx.strokeStyle = isGoal
          ? "#16A34A"
          : pulse > 0.1 || hot
            ? palette.gold
            : palette.slate200;
        ctx.stroke();
        ctx.restore();

        // Icon Box
        const icx = bx + padX + iconBox / 2;
        const icy = cy;
        ctx.save();
        ctx.fillStyle = isGoal
          ? "#16A34A"
          : pulse > 0.1 || hot
            ? palette.navy
            : "#EEF2FF";
        ctx.beginPath();
        ctx.roundRect(icx - iconBox / 2, icy - iconBox / 2, iconBox, iconBox, 6 * s);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(icx, icy);
        ctx.strokeStyle = isGoal || pulse > 0.1 || hot ? "#FFFFFF" : palette.navy;
        drawIcon(ctx, n.icon, iconBox);
        ctx.restore();

        // Label text (Single line vertically centered with icon)
        const tx = bx + padX + iconBox + gap;
        const maxTextW = bx + w - tx - 8 * s;
        ctx.save();
        ctx.fillStyle = isGoal ? "#166534" : palette.navy;
        ctx.font = `600 ${10.5 * s}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textBaseline = "middle";
        ctx.fillText(n.label ?? id, tx, cy, maxTextW);
        ctx.restore();
      });
    };

    let raf = 0;
    let startTime = 0;
    const loop = (now: number) => {
      if (!startTime) startTime = now;
      draw((now - startTime) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => measure())
      : null;
    ro?.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [model]);

  return (
    <div className={cn("relative w-full overflow-hidden select-none", className)}>
      {/* Mobile Dedicated Vertical Zig-Zag Flow (screens < 640px) */}
      <div className="block sm:hidden w-full">
        <MobileZigZagMap persona={persona} />
      </div>

      {/* Desktop Horizontal Runtime Canvas (screens >= 640px) */}
      <div
        ref={wrapRef}
        className="hidden sm:block relative w-full h-[300px] md:h-[320px] overflow-hidden"
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Dedicated Mobile Vertical Zig-Zag Component                                */
/* -------------------------------------------------------------------------- */

interface MobileStage {
  step: string;
  label: string;
  icon: React.ElementType;
}

const MOBILE_STAGES: Record<"learners" | "institutions" | "enterprises", MobileStage[]> = {
  learners: [
    { step: "01", label: "Set Your Goals", icon: Target },
    { step: "02", label: "AI Prepare Path", icon: Compass },
    { step: "03", label: "Cognitive Matrix", icon: BrainCircuit },
    { step: "04", label: "Sandbox & Learn", icon: Code2 },
    { step: "05", label: "Showcase Skills", icon: Award },
    { step: "06", label: "Get Hired", icon: Briefcase },
  ],
  institutions: [
    { step: "01", label: "Create Cohorts", icon: Users },
    { step: "02", label: "Assign Paths", icon: BookOpen },
    { step: "03", label: "Schedule Exams", icon: Laptop },
    { step: "04", label: "Live AI Proctor", icon: ShieldCheck },
    { step: "05", label: "AI Result Analysis", icon: BarChart3 },
  ],
  enterprises: [
    { step: "01", label: "Custom Sprints", icon: Terminal },
    { step: "02", label: "Matched Profiles", icon: Search },
    { step: "03", label: "Psychometric Data", icon: BrainCircuit },
    { step: "04", label: "Shortlist Talent", icon: FileCheck },
    { step: "05", label: "Hire Verified", icon: UserCheck },
  ],
};

export const MobileZigZagMap: React.FC<{ persona: "learners" | "institutions" | "enterprises" }> = ({
  persona,
}) => {
  const stages = MOBILE_STAGES[persona];
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathD, setPathD] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const updatePath = () => {
      if (cancelled) return;
      const cont = containerRef.current;
      if (!cont) return;
      const parentRect = cont.getBoundingClientRect();

      const pts = cardRefs.current
        .map((el, i) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          if (i === stages.length - 1) {
            return {
              x: r.left + r.width / 2 - parentRect.left,
              y: r.top - parentRect.top,
            };
          }
          return {
            x: (i % 2 === 0 ? r.right : r.left) - parentRect.left,
            y: r.top + r.height / 2 - parentRect.top,
          };
        })
        .filter(Boolean) as { x: number; y: number }[];

      if (pts.length < 2) return;

      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;

        if (i === pts.length - 2) {
          const c1x = p0.x + dx * 0.5;
          const c1y = p0.y + dy * 0.2;
          const c2x = p1.x;
          const c2y = p1.y - dy * 0.35;
          d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p1.x} ${p1.y}`;
        } else {
          const c1x = p0.x + dx * 0.5;
          const c1y = p0.y + dy * 0.15;
          const c2x = p1.x - dx * 0.5;
          const c2y = p1.y - dy * 0.15;
          d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p1.x} ${p1.y}`;
        }
      }
      setPathD(d);
    };

    updatePath();
    const rafId = requestAnimationFrame(() => updatePath());
    const timerId = setTimeout(() => updatePath(), 100);

    const handleResize = () => updatePath();
    window.addEventListener("resize", handleResize);

    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => updatePath())
      : null;
    if (containerRef.current) ro?.observe(containerRef.current);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
      ro?.disconnect();
    };
  }, [persona, stages]);

  return (
    <div
      ref={containerRef}
      className="relative w-full pt-8 pb-14 px-4 flex flex-col gap-8 min-h-[520px] overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40"
    >
      <div className="absolute top-1/4 -left-12 w-48 h-48 rounded-full bg-[#312E81]/5 blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-12 w-48 h-48 rounded-full bg-[#7C3AED]/10 blur-2xl pointer-events-none" />

      {/* SVG Connecting Flow Lines & Comet */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {pathD && (
          <>
            <path
              d={pathD}
              fill="none"
              stroke="#7C3AED"
              strokeWidth="6"
              strokeOpacity="0.25"
              strokeLinecap="round"
            />
            <path
              d={pathD}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="2.5"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
            <path
              d={pathD}
              fill="none"
              stroke="#312E81"
              strokeWidth="2"
              strokeDasharray="10 20"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
            <circle r="9" fill="#7C3AED" opacity="0.35">
              <animateMotion path={pathD} dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle r="5" fill="#7C3AED">
              <animateMotion path={pathD} dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle r="2.5" fill="#10B981">
              <animateMotion path={pathD} dur="3.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>

      {/* Vertical Zig-Zag Cards */}
      {stages.map((st, idx) => {
        const IconComponent = st.icon;
        const isGoal = idx === stages.length - 1;
        const isEven = idx % 2 === 0;
        const isHot = activeStep === idx;

        return (
          <div
            key={st.step}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            onClick={() => setActiveStep(isHot ? null : idx)}
            className={cn(
              "relative z-10 p-3 rounded-xl border transition-all duration-300 cursor-pointer select-none",
              isGoal
                ? "self-center w-[85%] max-w-[200px] mx-auto bg-gradient-to-r from-emerald-500/10 via-white to-emerald-500/15 border-[#16A34A] shadow-[0_4px_18px_rgba(22,163,74,0.22)] ring-1 ring-[#16A34A]/70"
                : isEven
                  ? "self-start w-[78%] max-w-[190px] ml-1 bg-white border-slate-200/90 shadow-[0_2px_12px_rgba(49,46,129,0.06)]"
                  : "self-end w-[78%] max-w-[190px] mr-1 bg-white border-slate-200/90 shadow-[0_2px_12px_rgba(49,46,129,0.06)]",
              isHot && !isGoal && "ring-2 ring-[#7C3AED] border-[#7C3AED]"
            )}
          >
            {/* Magnetic Connector Port Dot */}
            {!isGoal && isEven && (
              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#312E81] border-2 border-white shadow-xs z-20" />
            )}
            {!isGoal && !isEven && (
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#312E81] border-2 border-white shadow-xs z-20" />
            )}
            {isGoal && (
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#16A34A] border-2 border-white shadow-xs z-20" />
            )}

            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center transition-colors",
                  isGoal
                    ? "bg-[#16A34A] text-white shadow-xs"
                    : isHot
                      ? "bg-[#312E81] text-[#7C3AED]"
                      : "bg-[#EEF2FF] text-[#312E81]"
                )}
              >
                <IconComponent className="size-4" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#312E81] leading-tight truncate">
                  {st.label}
                </h4>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PersonaSignalMap;
