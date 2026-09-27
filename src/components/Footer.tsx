"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, ShieldCheck, Award } from "lucide-react";

interface FooterProps {
  onOpenLearner?: () => void;
  onOpenDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo }) => {
  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200 text-[#334155] text-sm">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-14">

          {/* Brand Info */}
          <div className="space-y-4 max-w-lg">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="NexaDhi"
                width={280}
                height={90}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
              NexaDhi by Neuronexa is an AI-powered platform that connects verified engineering talent
              with companies and institutions through skill-based assessments and smart recruitment tools.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs text-slate-500 pt-1 font-sans">
              <div className="flex items-center gap-1.5">
                <Shield className="size-3.5 text-[#16A34A] shrink-0" />
                <span>Enterprise Grade</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-[#16A34A] shrink-0" />
                <span>SOC2 Compliant</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Award className="size-3.5 text-[#16A34A] shrink-0" />
                <span>ISO/IEC 27001 Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <p>
            © {new Date().getFullYear()} NexaDhi by{" "}
            <a
              href="https://neuronexalabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#312E81] font-semibold hover:underline"
            >
              Neuronexa Labs
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#312E81] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#312E81] transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={onOpenDemo}
              suppressHydrationWarning
              className="hover:text-[#312E81] transition-colors cursor-pointer"
            >
              Enterprise Contact
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

