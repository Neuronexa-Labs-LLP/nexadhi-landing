"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, GraduationCap, School, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLE_OPTIONS = [
  { id: "learner", label: "Learner", icon: GraduationCap },
  { id: "college", label: "Institution", icon: School },
  { id: "company", label: "Company", icon: Building2 },
];

export const LearnerRegistrationModal: React.FC<LearnerModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState<"learner" | "college" | "company">("learner");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) {
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
          name: fullName,
          email: email,
          accountType:
            selectedRole === "learner"
              ? "Individual Learner"
              : selectedRole === "college"
              ? "College / Institution"
              : "Company / Recruiter",
          message: `Join Waitlist registration from ${fullName} (${selectedRole}) with email ${email}`,
          _subject: `New Waitlist Registration | NexaDhi (${fullName})`,
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
    setEmail("");
    setFullName("");
    setSelectedRole("learner");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleReset()}>
      <DialogContent className="sm:max-w-[410px] p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xl">

        {!isSubmitted ? (
          <>
            <DialogHeader className="space-y-1 pr-5">
              <DialogTitle className="text-base sm:text-lg font-bold text-[#312E81] tracking-tight font-heading leading-snug">
                Join Waitlist Now
              </DialogTitle>
            </DialogHeader>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-2 font-sans">
              {/* Account Type Radio Selector */}
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-[#312E81]">ACCOUNT TYPE</Label>
                <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Select account type">
                  {ROLE_OPTIONS.map((role) => {
                    const isSelected = selectedRole === role.id;
                    const IconComp = role.icon;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedRole(role.id as "learner" | "college" | "company")}
                        className={cn(
                          "flex items-center gap-1.5 p-2 rounded-xl border text-[11px] font-medium cursor-pointer transition-all select-none text-left",
                          isSelected
                            ? "bg-[#EEF2FF] border-[#312E81] text-[#312E81] font-semibold shadow-xs"
                            : "bg-[#F8FAFC] border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        {/* Radio Circle */}
                        <div
                          className={cn(
                            "size-3.5 rounded-full flex items-center justify-center transition-colors shrink-0",
                            isSelected
                              ? "border-2 border-[#312E81] bg-[#312E81]"
                              : "border border-slate-300 bg-white"
                          )}
                        >
                          {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                        </div>
                        <IconComp className="size-3.5 shrink-0 opacity-70" />
                        <span className="truncate">{role.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name / Company / Institute Input */}
              <div className="space-y-1">
                <Label htmlFor="learner-name" className="text-[11px] font-bold text-[#312E81]">
                  {selectedRole === "company"
                    ? "COMPANY NAME"
                    : selectedRole === "college"
                    ? "INSTITUTE NAME"
                    : "FULL NAME"}
                </Label>
                <Input
                  id="learner-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-9 text-xs px-3 rounded-xl border-slate-200 bg-[#F8FAFC] text-[#312E81]"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="learner-email" className="text-[11px] font-bold text-[#312E81]">
                  {selectedRole === "company"
                    ? "WORK EMAIL"
                    : selectedRole === "college"
                    ? "OFFICIAL EMAIL"
                    : "EMAIL ADDRESS"}
                </Label>
                <Input
                  id="learner-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 text-xs px-3 rounded-xl border-slate-200 bg-[#F8FAFC] text-[#312E81]"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isSubmitting}
                className="w-full font-semibold h-9.5 rounded-full bg-[#312E81] hover:bg-[#1E1B4B] text-white cursor-pointer text-xs shadow-md mt-1 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                <ArrowRight className="size-3.5 ml-1" />
              </Button>

            </form>
          </>
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

