import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy | NexaDhi - AI-Native Talent Platform",
  description: "Privacy Policy and data governance standards for NexaDhi platform by NeuroNexa Labs.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-800 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-xs bg-white">
          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs font-semibold px-2 py-0.5 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-indigo-600 inline" />
            Data Protection & Privacy
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Privacy Policy
          </h1>

          <p className="text-xs text-slate-400 mb-5 font-medium">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">1. Overview</h2>
              <p>
                NexaDhi by NeuroNexa Labs is committed to protecting candidate, enterprise, and institutional
                privacy. This policy details how we collect, store, and process telemetry and profile data
                across our AI assessment platform.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. Candidate Code & Assessment Telemetry</h2>
              <p>
                All browser-based coding sandbox executions, keystroke telemetry, and diagnostic responses
                are processed within isolated ephemeral microVMs. We do not use candidate code submissions
                to train public third-party foundational models.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. Recruiter Showcase Visibility</h2>
              <p>
                Learners maintain full opt-in control over whether their verified benchmark scores are visible
                to corporate recruiters. You may toggle visibility on or off at any time from your settings.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">4. Contact & Compliance</h2>
              <p>
                For data subject requests or privacy questions, contact our security officer at{" "}
                <strong className="text-slate-900 font-semibold">info@neuronexalabs.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
