"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FAQItem {
  id: string;
  category: "learners" | "enterprises" | "institutions";
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  // ==========================================
  // FOR LEARNERS & STUDENTS (10 FAQs)
  // ==========================================
  {
    id: "l-1",
    category: "learners",
    question: "What is NexaDhi and how is it different from LeetCode or HackerRank?",
    answer:
      "Unlike static question banks, NexaDhi is an AI-native talent intelligence platform. It pairs dynamic, adaptive coding diagnostics with zero-setup cloud sandboxes, multi-signal anti-cheat, and cryptographically verified skill profiles. Rather than just grinding problems, your verified execution telemetry is shared directly with top hiring teams to bypass resume screening.",
  },
  {
    id: "l-2",
    category: "learners",
    question: "How does the Adaptive AI Skill Assessment work?",
    answer:
      "Our diagnostic engine analyzes your real-time problem-solving behavior, code efficiency, edge-case handling, and time complexity. Questions automatically calibrate difficulty based on your submissions. A 15-minute diagnostic produces a detailed competency breakdown and national percentile rank.",
  },
  {
    id: "l-3",
    category: "learners",
    question: "Which programming languages are supported in the in-browser sandbox?",
    answer:
      "NexaDhi provides instant, zero-setup compilation for Python, TypeScript, JavaScript, Java, C++, Go, and Rust. All code executes inside secure, isolated cloud micro-containers with automated test suites, execution time benchmarks, and memory usage profiling.",
  },
  {
    id: "l-4",
    category: "learners",
    question: "Is NexaDhi free for developers and students?",
    answer:
      "Yes. Individual learners and college students receive full access to diagnostic assessments, cloud sandboxes, personalized learning roadmaps, and verified credentials completely free without any subscription fees.",
  },
  {
    id: "l-5",
    category: "learners",
    question: "How does NexaDhi help me get hired at top tech companies?",
    answer:
      "Partner companies search candidates by verified code execution telemetry and percentile rankings rather than keyword-stuffed resumes. Top performers receive direct inbound interview invitations with fast-tracked technical rounds.",
  },
  {
    id: "l-6",
    category: "learners",
    question: "What is the NexaDhi Skill Passport / Verified Credential?",
    answer:
      "It is a tamper-proof, SHA-256 signed digital credential that documents your verified coding benchmarks, problem-solving percentiles, and sandbox execution proofs that can be embedded on LinkedIn, GitHub, or shared with hiring teams.",
  },
  {
    id: "l-7",
    category: "learners",
    question: "What happens if I fail a test case or assessment?",
    answer:
      "NexaDhi provides automated diagnostic feedback explaining time-complexity flaws, syntax bugs, and edge cases. You can review the step-by-step breakdown, practice in sandbox mode, and retake assessments after cooling periods.",
  },
  {
    id: "l-8",
    category: "learners",
    question: "Can I use NexaDhi to prepare for specific roles like GenAI or Distributed Systems?",
    answer:
      "Yes. You can select specialized career tracks such as GenAI Engineering, Distributed Systems, Cloud Backend, and Systems Architecture to receive adaptive curriculum roadmaps aligned with tier-1 industry standards.",
  },
  {
    id: "l-9",
    category: "learners",
    question: "Does NexaDhi provide code mentorship or hints when I am stuck?",
    answer:
      "Yes. Our contextual AI mentor provides non-spoiler hints, architectural breakdowns, and complexity optimization suggestions whenever you need guidance in the sandbox.",
  },
  {
    id: "l-10",
    category: "learners",
    question: "Do I need to install any IDE, compilers, or extensions locally?",
    answer:
      "No. NexaDhi is 100% in-browser with zero local setup. Compilers, runtimes, package managers, and automated unit test runners are pre-provisioned in our high-speed cloud infrastructure.",
  },

  // ==========================================
  // FOR ENTERPRISES & COMPANIES (10 FAQs)
  // ==========================================
  {
    id: "e-1",
    category: "enterprises",
    question: "How does NexaDhi eliminate resume screening bottlenecks?",
    answer:
      "Recruiters query and filter pre-vetted engineers by actual code execution telemetry, algorithmic speed percentiles, and test accuracy across real sandboxes rather than sorting through thousands of inflated resumes.",
  },
  {
    id: "e-2",
    category: "enterprises",
    question: "How does the multi-signal anti-cheat system guarantee candidate authenticity?",
    answer:
      "NexaDhi evaluates keystroke cadence dynamics, secondary monitor leakage, tab-switch frequency, copy-paste telemetry, and behavioral anomalies to verify that code is written organically without external AI bot pasting.",
  },
  {
    id: "e-3",
    category: "enterprises",
    question: "Can companies create custom assessment challenges for their specific tech stack?",
    answer:
      "Yes. Enterprise engineering teams can author custom technical challenges, take-home sandboxes, and multi-file projects tailored exactly to their internal stack (e.g., Rust, Next.js, FastAPI, Kubernetes, Go).",
  },
  {
    id: "e-4",
    category: "enterprises",
    question: "What is the typical hiring turnaround velocity with NexaDhi?",
    answer:
      "By sourcing candidates with pre-validated execution proof, partner enterprises slash their hiring cycles from 45 days down to 48 hours with a 96.8% verified 90-day candidate retention rate.",
  },
  {
    id: "e-5",
    category: "enterprises",
    question: "What psychometric and cognitive metrics are evaluated?",
    answer:
      "We assess problem-solving agility under pressure, troubleshooting persistence when tests fail, logical deduction, cognitive endurance, and architectural communication propensity.",
  },
  {
    id: "e-6",
    category: "enterprises",
    question: "Can multiple interviewers collaborate on unified candidate scorecards?",
    answer:
      "Yes. NexaDhi provides Kanban shortlisting boards, synchronized live session replays, side-by-side industry benchmark comparisons, and unified multi-evaluator scorecards.",
  },
  {
    id: "e-7",
    category: "enterprises",
    question: "Does NexaDhi integrate with our existing Applicant Tracking System (ATS)?",
    answer:
      "Yes. NexaDhi offers webhooks and native API integrations with Greenhouse, Lever, Workday, Ashby, and BambooHR to automatically synchronize candidate scores and pipeline status.",
  },
  {
    id: "e-8",
    category: "enterprises",
    question: "Can we conduct live pair-programming interviews on NexaDhi?",
    answer:
      "Yes. Our live collaborative sandbox supports synchronized multi-cursor editing, real-time terminal output, audio/video conferencing, and automated recording with playback scrubbing.",
  },
  {
    id: "e-9",
    category: "enterprises",
    question: "Is candidate data and proprietary challenge code secure?",
    answer:
      "All data is encrypted with AES-256-GCM at rest and TLS 1.3 in transit. Enterprise sandboxes run in isolated, ephemeral zero-trust containers destroyed immediately upon challenge completion.",
  },
  {
    id: "e-10",
    category: "enterprises",
    question: "How are custom benchmark scoring rubrics calibrated?",
    answer:
      "You can configure customized weighting for execution speed, memory efficiency, code clean architecture, and test case pass rates to match your engineering team's exact internal hiring bar.",
  },

  // ==========================================
  // FOR COLLEGES & INSTITUTIONS (10 FAQs)
  // ==========================================
  {
    id: "i-1",
    category: "institutions",
    question: "How do universities and colleges onboard large student batches?",
    answer:
      "Institutions can onboard 5,000+ students in minutes via 1-click CSV bulk uploads or direct LMS synchronization with Canvas, Moodle, Blackboard, Google Classroom, and institutional SIS portals.",
  },
  {
    id: "i-2",
    category: "institutions",
    question: "How does NexaDhi assist Training & Placement Officers (TPOs)?",
    answer:
      "TPOs receive real-time cohort dashboards, student placement readiness ratings, department-wide skill gap heatmaps, and 1-click candidate shortlists for visiting recruiters.",
  },
  {
    id: "i-3",
    category: "institutions",
    question: "Can colleges host campus-wide mock recruitment tests and hackathons?",
    answer:
      "Yes. NexaDhi's high-concurrency exam engine supports thousands of simultaneous students taking timed multi-section assessments (aptitude, coding, system design) with automated grading.",
  },
  {
    id: "i-4",
    category: "institutions",
    question: "How does AI invigilation prevent malpractice during campus exams?",
    answer:
      "Our multi-signal proctoring incorporates browser lockdown, secondary display detection, copy-paste blocking, and keystroke cadence analysis with timestamped incident replays for faculty review.",
  },
  {
    id: "i-5",
    category: "institutions",
    question: "How does NexaDhi help with NAAC, NBA, and ABET accreditation?",
    answer:
      "NexaDhi provides 1-click exports of objective learning outcome metrics, department-level skill diagnostics, and continuous evaluation reports aligned with NAAC and NBA accreditation rubrics.",
  },
  {
    id: "i-6",
    category: "institutions",
    question: "Can professors assign custom curriculum pathways and weekly lab assignments?",
    answer:
      "Faculty can author tailored syllabi, schedule recurring weekly programming labs, set automated grading benchmarks, and send automated progress nudges to lagging learners.",
  },
  {
    id: "i-7",
    category: "institutions",
    question: "What analytics do department heads receive?",
    answer:
      "Department heads receive granular heatmaps revealing conceptual blindspots (e.g., recursion, graph algorithms, concurrency), batch progress velocity, and comparative placement readiness.",
  },
  {
    id: "i-8",
    category: "institutions",
    question: "Does NexaDhi require dedicated server infrastructure on campus?",
    answer:
      "No. NexaDhi is 100% cloud-hosted with zero local hardware requirements. Students and faculty can access sandboxes and exams from any standard browser on campus lab PCs or personal laptops.",
  },
  {
    id: "i-9",
    category: "institutions",
    question: "Can institutions invite corporate recruitment partners directly onto the platform?",
    answer:
      "Yes. Colleges can create private placement portals where verified company partners can review pre-screened student scorecards and dispatch direct interview invitations.",
  },
  {
    id: "i-10",
    category: "institutions",
    question: "Is faculty training and technical support provided for institutional pilots?",
    answer:
      "Yes. We provide dedicated onboarding sessions for faculty and TPOs, sample question banks, placement mock templates, and 24/7 technical assistance during live exam drives.",
  },
];

interface FAQSectionProps {
  onOpenLearner: () => void;
  onOpenDemo: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenLearner, onOpenDemo }) => {
  const [openId, setOpenId] = useState<string | null>("l-1");
  const [selectedCategory, setSelectedCategory] = useState<"learners" | "enterprises" | "institutions">("learners");

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqs.filter((faq) => faq.category === selectedCategory);

  // Generate Google-compliant JSON-LD structured data for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section id="faqs" className="py-16 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      {/* Inject FAQPage Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#312E81] tracking-tight leading-tight font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Category Filter Pills (No 'All Questions', default Learners) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6">
          {[
            { id: "learners", label: "For Learners" },
            { id: "enterprises", label: "For Enterprises" },
            { id: "institutions", label: "For Colleges" },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                suppressHydrationWarning
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  const firstInCat = faqs.find((f) => f.category === cat.id);
                  if (firstInCat) setOpenId(firstInCat.id);
                }}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer font-sans ${isSelected
                  ? "bg-[#312E81] text-white shadow-2xs"
                  : "bg-white text-[#334155] border border-slate-200 hover:border-slate-300 hover:text-[#312E81]"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Compact Accordion Questions List */}
        <div className="space-y-2">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            const indexNumber = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-150 overflow-hidden bg-white ${isOpen
                  ? "border-slate-300 shadow-[0_2px_10px_rgba(49,46,129,0.05)] ring-1 ring-slate-200"
                  : "border-slate-200/90 hover:border-slate-300 shadow-2xs"
                  }`}
              >
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full text-left px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-3 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#312E81]"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-1">
                    <span className="font-mono text-[11px] font-bold text-slate-400 shrink-0">
                      {indexNumber}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#312E81] font-heading leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`size-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen
                      ? "bg-[#312E81] text-white rotate-180"
                      : "bg-slate-100 text-slate-500 border border-slate-200/80"
                      }`}
                  >
                    <ChevronDown className="size-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    className="px-4 sm:px-5 pb-3.5 pt-0 text-xs sm:text-[13px] text-[#334155] leading-relaxed font-sans border-t border-slate-100"
                  >
                    <p className="pt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

