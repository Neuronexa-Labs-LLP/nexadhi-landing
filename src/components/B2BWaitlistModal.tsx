"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Building2,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: "enterprise" | "institution";
}

export const DemoWaitlistModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  defaultType = "enterprise",
}) => {
  const [orgType, setOrgType] = useState<"enterprise" | "institution">(defaultType);
  const [workEmail, setWorkEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail || !orgName) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@neuronexalabs.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: orgName,
          email: workEmail,
          organizationType: orgType === "enterprise" ? "Company / Enterprise" : "College / Institute",
          message: `Join Waitlist request from ${orgName} (${orgType === "enterprise" ? "Company" : "College / Institute"}) with email ${workEmail}`,
          _subject: `New Enterprise Inquiry | NexaDhi Waitlist (${orgName})`,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success !== "false") {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        console.error("Submission rejected by server:", result);
        alert("Message delivery failed. Please contact us directly on WhatsApp at +91 91104 35020.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Network error during form submission:", error);
      alert("Network error. Please reach us directly on WhatsApp at +91 91104 35020 or email info@neuronexalabs.com.");
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setWorkEmail("");
    setOrgName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white border border-slate-200 shadow-xl rounded-2xl">
        {!isSubmitted ? (
          <div>
            {/* Header banner - Compact */}
            <div className="bg-[#F8FAFC] border-b border-slate-200">

              <DialogHeader>
                <DialogTitle className="text-base font-bold tracking-tight text-[#312E81] font-heading leading-snug">
                  Join Waitlist
                </DialogTitle>
              </DialogHeader>

              {/* Compact Segment Toggle */}
              <div className="mt-2.5 grid grid-cols-2 p-0.5 bg-white border border-slate-200 rounded-full gap-0.5">
                <button
                  type="button"
                  onClick={() => setOrgType("enterprise")}
                  className={`flex items-center justify-center gap-1.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer font-sans ${orgType === "enterprise"
                    ? "bg-[#312E81] text-white shadow-2xs"
                    : "text-slate-600 hover:text-[#312E81]"
                    }`}
                >
                  <Building2 className="size-3" />
                  Company
                </button>
                <button
                  type="button"
                  onClick={() => setOrgType("institution")}
                  className={`flex items-center justify-center gap-1.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer font-sans ${orgType === "institution"
                    ? "bg-[#312E81] text-white shadow-2xs"
                    : "text-slate-600 hover:text-[#312E81]"
                    }`}
                >
                  <GraduationCap className="size-3" />
                  College / Institute
                </button>
              </div>
            </div>

            {/* Compact Form */}
            <form onSubmit={handleSubmit} className="px-4.5 py-3 space-y-2.5 font-sans">
              <div className="space-y-1">
                <Label htmlFor="org-name" className="text-[11px] font-bold text-[#312E81]">
                  {orgType === "enterprise" ? "COMPANY NAME" : "INSTITUTE NAME"}
                </Label>
                <Input
                  id="org-name"
                  placeholder={orgType === "enterprise" ? "e.g. Jio Platforms, TCS, or Razorpay" : "e.g. IIT Madras, BITS Pilani, or NITK"}
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="h-8.5 text-xs px-3 rounded-full border-slate-200 bg-[#F8FAFC] text-[#312E81] focus:border-[#312E81]"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="org-workemail" className="text-[11px] font-bold text-[#312E81]">
                  {orgType === "enterprise" ? "WORK EMAIL" : "OFFICIAL EMAIL"}
                </Label>
                <Input
                  id="org-workemail"
                  type="email"
                  placeholder={orgType === "enterprise" ? "priya.sharma@razorpay.com" : "placements@iitm.ac.in"}
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  className="h-8.5 text-xs px-3 rounded-full border-slate-200 bg-[#F8FAFC] text-[#312E81] focus:border-[#312E81]"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isSubmitting}
                className="w-full font-semibold h-9 rounded-full bg-[#312E81] hover:bg-[#1E1B4B] text-white cursor-pointer text-xs shadow-md mt-1 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Submitting..." : "Request Priority Access"}</span>
                <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </form>
          </div>
        ) : (
          /* Simple Success State */
          <div className="p-6 sm:p-8 text-center space-y-4 font-sans">
            <div className="size-12 mx-auto rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="size-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#312E81] tracking-tight font-heading">
                Thank You!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                We have received your details. Our team will get in touch with you shortly.
              </p>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleReset}
                className="w-full max-w-[140px] rounded-full bg-[#312E81] hover:bg-[#1E1B4B] text-white text-xs font-semibold h-9 shadow-md cursor-pointer"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const B2BWaitlistModal = DemoWaitlistModal;
