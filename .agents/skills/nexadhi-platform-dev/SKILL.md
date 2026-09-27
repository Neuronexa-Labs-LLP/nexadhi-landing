---
name: nexadhi-platform-dev
description: Development guide, design tokens, component standards, and architecture reference for the NexaDhi landing page and AI assessment platform.
---

# NexaDhi Platform Development Guide

## 1. Project Tech Stack
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Custom Design Tokens (`globals.css`, `theme.ts`)
- **Animation**: Framer Motion + Canvas 2D Particle/Topology Accelerators
- **Components**: Radix UI primitives (`@/components/ui/`), Lucide Icons (`lucide-react`)
- **Notifications**: Sonner (`sonner`)

---

## 2. Design System & Brand Palette

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| **Deep Indigo (Primary)** | `#312E81` | Brand headers, primary buttons, active badges, core topology |
| **Indigo 700** | `#4338CA` | Hover states, gradients, subtle border outlines |
| **Light Indigo (Subtle)**| `#EEF2FF` | Pill backgrounds, tag backdrops, active sidebar items |
| **Brand Green** | `#16A34A` | Accent pills, verified indicators, destination highlights |
| **Growth Mint** | `#10B981` | Metric badges, ticker pulses, positive gain tags |
| **Accent Violet** | `#7C3AED` | Particle comets, focus rings, secondary gradients |
| **Slate Body** | `#334155` | Paragraph descriptions, secondary text |
| **Muted Slate** | `#64748B` | Subtle footnotes, timestamps, helper labels |
| **Base Background** | `#F8FAFC` | Standardized page background, sections, and orb canvas |
| **Card Surface** | `#FFFFFF` | Elevated cards, chassis mockups, modal surfaces |
| **Border Neutral** | `#E2E8F0` | Structural card borders, dividers |

---

## 3. Core Component Architecture

### A. Navigation & Branding (`Navbar.tsx`, `Footer.tsx`)
- Transparent navbar overlay (`bg-transparent`) with elevated sticky z-index (`z-100`).
- Official NexaDhi Logo (`/logo.png`) scaled appropriately (`h-14 sm:h-16 md:h-18` in Navbar, `h-16 sm:h-20` in Footer).

### B. Hero & 3D Orb Section (`HeroSection.tsx`, `HeroBackgroundAnimation.tsx`, `Orb.tsx`)
- Orb component renders WebGL shader simulation with `backgroundColor="#F8FAFC"`.
- Clean centered headline with "Learning & Hiring" grouped inside the highlighted green underline span.
- Centered stats summary (`1,400+ learners joined • 50+ institutions • 300+ companies`).

### C. Audience Persona Signal Map (`PersonaBentoGrid.tsx`, `PersonaSignalMap.tsx`)
- **Desktop (>= 640px)**: 60fps HTML5 Canvas with cubic Bézier curve paths, interactive pointer spotlight, flow packets, and animated request comet.
- **Mobile (< 640px)**: Dedicated responsive vertical zig-zag step chain (`MobileZigZagMap`) with SVG Bézier connector lines and touch-friendly cards.
- **Node Topologies**:
  - `learners`: Goals -> Path -> Matrix -> Sandbox -> Showcase -> Hired (`briefcase`)
  - `institutions`: Cohorts -> Assign -> Exams -> Proctor -> Results (`chart`)
  - `enterprises`: Sprints -> Profiles -> Matrix -> Shortlist -> Hire Verified (`usercheck`)

### D. Interactive Registration & Waitlist Modals
- **Learner Registration** (`B2CRegistrationModal.tsx`): Single-select professional radio button group (`Learner`, `Institution`, `Company`), label `FULL NAME / COMPANY / INSTITUTE`, clean input fields without placeholder clutter.
- **B2B Demo Waitlist** (`B2BWaitlistModal.tsx`): Enterprise & campus placement pilot form with team size and requirement inputs.

---

## 4. Code Standards & Verification Routine
1. Always keep interactive elements accessible with descriptive `aria-` labels.
2. Maintain clean responsive layouts (`sm:`, `md:`, `lg:` breakpoints).
3. Validate compilation after all changes using:
   ```bash
   npx tsc --noEmit
   ```
