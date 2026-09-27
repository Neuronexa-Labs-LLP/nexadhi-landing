"use client";

import React, { useId, useState } from "react";

export interface TopologyNode {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  sublabel?: string;
  status?: "running" | "completed" | "queued" | "failed" | "active" | "settled";
  glyph?: "check" | "pulse" | "cross" | "dot" | "ring" | "sparkle";
  metric?: string;
}

export interface TopologyConnection {
  id: string;
  from: string;
  to: string;
  status?: "active" | "completed" | "queued" | "failed";
}

export interface SafeArea {
  x: number; // 0 to 1
  y: number; // 0 to 1
  w: number; // 0 to 1
  h: number; // 0 to 1
}

export interface WorkflowTopologyFieldProps {
  nodes: TopologyNode[];
  connections: TopologyConnection[];
  activeNodeIds?: string[];
  activeConnectionIds?: string[];
  safeArea?: SafeArea;
  className?: string;
  children?: React.ReactNode;
  speed?: number;
  interactive?: boolean;
  onNodeClick?: (nodeId: string) => void;
}

export const WorkflowTopologyField: React.FC<WorkflowTopologyFieldProps> = ({
  nodes,
  connections,
  activeNodeIds = [],
  activeConnectionIds = [],
  safeArea = { x: 0.1, y: 0.15, w: 0.8, h: 0.7 },
  className = "",
  children,
  interactive = true,
  onNodeClick,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const maskId = useId();

  // Create node lookup map
  const nodeMap = new Map<string, TopologyNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      
      {/* Deterministic SVG Atmospheric Topology Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Safe Area Linear/Radial Gradient Mask */}
          <mask id={maskId}>
            <rect width="1000" height="600" fill="white" />
            {safeArea && (
              <rect
                x={safeArea.x * 1000}
                y={safeArea.y * 600}
                width={safeArea.w * 1000}
                height={safeArea.h * 600}
                rx="24"
                fill="black"
                opacity="0.78"
              />
            )}
          </mask>

          {/* Active Flow Gradient */}
          <linearGradient id="activeFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312E81" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
          </linearGradient>

          {/* Particle marker for pulse */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Masked Topology Connections Background */}
        <g mask={`url(#${maskId})`}>
          {/* Ambient Background Grid Nodes */}
          {Array.from({ length: 12 }).map((_, i) => {
            const gx = 60 + (i % 4) * 280 + ((i * 37) % 40);
            const gy = 70 + Math.floor(i / 4) * 180 + ((i * 19) % 30);
            return (
              <circle
                key={`ambient-node-${i}`}
                cx={gx}
                cy={gy}
                r="1.5"
                fill="rgba(27, 35, 77, 0.15)"
              />
            );
          })}
        </g>

        {/* Topology Paths & Connections */}
        <g>
          {connections.map((conn) => {
            const fromNode = nodeMap.get(conn.from);
            const toNode = nodeMap.get(conn.to);
            if (!fromNode || !toNode) return null;

            const x1 = (fromNode.x / 100) * 1000;
            const y1 = (fromNode.y / 100) * 600;
            const x2 = (toNode.x / 100) * 1000;
            const y2 = (toNode.y / 100) * 600;

            const dx = x2 - x1;
            const dy = y2 - y1;
            // Smooth natural cubic bezier control points
            const cx1 = x1 + dx * 0.5;
            const cy1 = y1;
            const cx2 = x1 + dx * 0.5;
            const cy2 = y2;
            const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

            const isActive = activeConnectionIds.includes(conn.id) || conn.status === "active";
            const isCompleted = conn.status === "completed";
            const isFailed = conn.status === "failed";

            return (
              <g key={conn.id}>
                {/* Base Path Guide Line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={
                    isActive
                      ? "rgba(124, 58, 237, 0.35)"
                      : isCompleted
                      ? "rgba(49, 46, 129, 0.18)"
                      : isFailed
                      ? "rgba(239, 68, 68, 0.25)"
                      : "rgba(49, 46, 129, 0.09)"
                  }
                  strokeWidth={isActive ? "2.5" : "1.5"}
                  strokeDasharray={isCompleted ? "none" : "4 4"}
                />

                {/* Animated Active Flow Line */}
                {isActive && (
                  <>
                    <path
                      d={pathData}
                      fill="none"
                      stroke="url(#activeFlow)"
                      strokeWidth="2.5"
                      strokeDasharray="12 12"
                      className="animate-topology-flow"
                      filter="url(#glow)"
                    />
                    {/* Flowing Pulse Particle */}
                    <circle r="3.5" fill="#10B981" filter="url(#glow)">
                      <animateMotion
                        path={pathData}
                        dur="3.2s"
                        repeatCount="indefinite"
                        rotate="auto"
                      />
                    </circle>
                  </>
                )}
              </g>
            );
          })}
        </g>

        {/* Topology Nodes */}
        <g>
          {nodes.map((node) => {
            const cx = (node.x / 100) * 1000;
            const cy = (node.y / 100) * 600;

            const isActive = activeNodeIds.includes(node.id) || node.status === "active" || node.status === "running";
            const isCompleted = node.status === "completed";
            const isFailed = node.status === "failed";
            const isHovered = hoveredNodeId === node.id;

            return (
              <g
                key={node.id}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={`${node.label} (${node.status || "queued"})`}
                className={interactive ? "cursor-pointer pointer-events-auto transition-transform outline-none focus:scale-110" : ""}
                onMouseEnter={() => interactive && setHoveredNodeId(node.id)}
                onMouseLeave={() => interactive && setHoveredNodeId(null)}
                onClick={() => interactive && onNodeClick?.(node.id)}
                onKeyDown={(e) => {
                  if (interactive && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onNodeClick?.(node.id);
                  }
                }}
              >
                {/* Active Outer Pulsing Ring */}
                {isActive && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="16"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="1.5"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* Failed Node Ring with Distinct Dash Geometry (Never color alone) */}
                {isFailed && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="15"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Node Solid Base Circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isActive ? "10" : isHovered ? "9" : "7"}
                  fill={
                    isActive
                      ? "#312E81"
                      : isCompleted
                      ? "#312E81"
                      : isFailed
                      ? "#EF4444"
                      : "#FFFFFF"
                  }
                  stroke={
                    isActive
                      ? "#10B981"
                      : isCompleted
                      ? "#312E81"
                      : isFailed
                      ? "#EF4444"
                      : "#CBD5E1"
                  }
                  strokeWidth={isActive ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                />

                {/* Center Status Glyph (accessible: readable without color alone) */}
                {isCompleted && (
                  <path
                    d={`M ${cx - 3.5} ${cy} L ${cx - 1} ${cy + 2.5} L ${cx + 3.5} ${cy - 2.5}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {isActive && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="#10B981"
                  />
                )}

                {isFailed && (
                  <path
                    d={`M ${cx - 2.5} ${cy - 2.5} L ${cx + 2.5} ${cy + 2.5} M ${cx + 2.5} ${cy - 2.5} L ${cx - 2.5} ${cy + 2.5}`}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )}

                {/* Node Label Text */}
                <text
                  x={cx}
                  y={cy + 19}
                  textAnchor="middle"
                  className="text-[10px] font-bold font-sans tracking-tight fill-[#312E81] select-none"
                  style={{ textShadow: "0 1px 3px rgba(255,255,255,0.9)" }}
                >
                  {node.label}
                </text>

                {/* Metric or Sublabel Badge if present */}
                {node.metric && (
                  <text
                    x={cx}
                    y={cy - 12}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-extrabold fill-[#3A4265] select-none"
                    style={{ textShadow: "0 1px 3px rgba(255,255,255,0.9)" }}
                  >
                    {node.metric}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Foreground Content Safe Area Container */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default WorkflowTopologyField;
