"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2, ArrowRight, Copy, Check, GraduationCap, School, Building2 } from "lucide-react";
import { toast } from "sonner";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState(14843);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    const assignedSpot = Math.floor(14800 + Math.random() * 80);
    setQueueNumber(assignedSpot);
    setIsSubmitted(true);
    toast.success("Welcome aboard! Your spot in NexaDhi Early Access is locked in.");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://nexadhi.com?ref=early-access");
    setIsCopied(true);
    toast.info("Referral link copied!");
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
    setFullName("");
    setSelectedRole("learner");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                  FULL NAME / COMPANY / INSTITUTE
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
                  EMAIL ADDRESS
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
                className="w-full font-semibold h-9.5 rounded-full bg-[#312E81] hover:bg-[#1E1B4B] text-white cursor-pointer text-xs shadow-md mt-1"
              >
                <span>Submit</span>
                <ArrowRight className="size-3.5 ml-1" />
              </Button>

            </form>
          </>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-2 space-y-3 font-sans">
            <div className="size-11 mx-auto rounded-full bg-emerald-50 text-[#10B981] border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="size-6" />
            </div>

            <div className="space-y-1">
              <Badge variant="default" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                Spot #{queueNumber} Confirmed
              </Badge>
              <h3 className="text-base font-bold text-[#312E81] font-heading">
                You&apos;re On the List!
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-normal">
                Confirmation details sent to <strong className="text-[#312E81]">{email}</strong>.
              </p>
            </div>

            {/* Share to Skip Queue Box */}
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-left space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#312E81] text-[11px]">Skip Ahead in Queue</span>
                <span className="text-[10px] text-slate-400">Share your invite link</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex-1 px-3 py-1.5 rounded-full bg-white border border-slate-200 font-mono text-[10px] text-slate-600 truncate">
                  nexadhi.com?ref=spot-{queueNumber}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="rounded-full h-7 px-2.5 text-[11px] font-semibold border-slate-200 text-[#312E81]"
                >
                  {isCopied ? "Copied!" : <Copy className="size-3" />}
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="w-full rounded-full text-xs font-semibold border-slate-200 text-[#312E81] h-8"
            >
              Done
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
};
