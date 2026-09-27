import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Terms of Service | NexaDhi - AI-Native Talent Platform",
  description: "Terms of Service and platform access terms for NexaDhi by NeuroNexa Labs.",
};

export default function TermsPage() {
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
            <FileText className="w-3.5 h-3.5 mr-1 text-indigo-600 inline" />
            Terms of Use
          </Badge>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Terms of Service
          </h1>

          <p className="text-xs text-slate-400 mb-5 font-medium">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">1. Early Access & Pre-Launch</h2>
              <p>
                NexaDhi is currently in Early Access. Features, diagnostic benchmarks, and sandbox
                quotas may be updated or refined prior to general commercial availability.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. Acceptable Use of Sandboxes</h2>
              <p>
                Users agree not to run malicious binaries, cryptominers, or denial-of-service scripts
                inside our in-browser execution containers. Violations will result in immediate queue revocation.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. Institutional Pilot Agreemeents</h2>
              <p>
                Colleges and enterprise partners participating in private pilots receive service-level agreements
                governed by separate enterprise pilot contracts.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
