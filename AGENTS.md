# NexaDhi Project Guidelines & Agent Directives

## 1. Overview
NexaDhi is an AI-powered talent assessment and engineering learning platform by Neuronexa Labs. Built with Next.js 16 App Router, React 19, Tailwind CSS v4, and Framer Motion.

## 2. Hierarchical Agent Memory (HAM) & Context Optimization
- **Working Memory**: Use surgical reads (`StartLine` and `EndLine` slices under 100 lines) to avoid context bloat.
- **Episodic Memory**: Document key architectural patterns and keep track of session milestones in artifacts.
- **Semantic Memory**: Reference `.agents/skills/ham-context-protocol` and `.agents/skills/nexadhi-platform-dev`.
- **KV-Cache Stability**: Retain consistent prefixes, avoid unnecessary prompt churn, and keep tool invocations deterministic.

## 3. Brand & Design Tokens
- **Background**: `#F8FAFC` across all page layouts, sections, and canvas backdrops.
- **Primary Indigo**: `#312E81` (Headings, primary CTA buttons, active states).
- **Brand Green Accents**: `#16A34A` / `#10B981` (Verified badges, highlights, counters).
- **Light Indigo**: `#EEF2FF` (Badges, subtle backgrounds).
- **Cards**: `#FFFFFF` with `#E2E8F0` borders.

## 4. Skills Available
- [ham-context-protocol](file:///.agents/skills/ham-context-protocol/SKILL.md): Agent memory & context optimization protocol.
- [nexadhi-platform-dev](file:///.agents/skills/nexadhi-platform-dev/SKILL.md): Complete platform architecture and design system reference.

## 5. Verification
After any code change, execute:
```bash
npx tsc --noEmit
```
Ensure 0 type errors before committing changes.
