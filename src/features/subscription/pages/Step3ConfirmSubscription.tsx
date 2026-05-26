"use client";

import { CheckCircle2, ShieldCheck, Mail, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HelmetMeta from "@/components/shared/HelmetMeta";

const plans = {
  basic: { name: "Basic", price: "7.99" },
  standard: { name: "Standard", price: "12.99" },
  premium: { name: "Premium", price: "17.99" },
};

export default function Step3ConfirmSubscription({ accountData, selectedPlanId, onConfirm }) {
  const plan = plans[selectedPlanId as keyof typeof plans] || plans.standard;

  return (
    <div className="w-full max-w-[500px] mx-auto px-6 py-12 bg-black text-white">
      <HelmetMeta
        name="Confirm Subscription"
        description="Review and confirm your Netflix subscription details."
      />

      {/* Header */}
      <div className="text-center mb-10">
        <CheckCircle2 className="w-16 h-16 text-[var(--netflix-red)] mx-auto mb-4" />
        <div className="flex items-center justify-center gap-2 mb-2 text-neutral-400">
          <span className="text-xs uppercase tracking-widest font-bold">Step 3 of 4</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Review your plan</h1>
      </div>

      {/* Summary Card */}
      <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 mb-8 shadow-2xl">
        <div className="p-6 border-b border-neutral-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-neutral-400 text-sm font-medium uppercase tracking-wider">Account</span>
            <span className="text-[var(--netflix-red)] text-sm font-bold cursor-pointer hover:underline">Change</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
              <Mail className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{accountData.email}</p>
              <p className="text-neutral-500 text-xs">Password: ********</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-neutral-800/30">
          <div className="flex justify-between items-center mb-4">
            <span className="text-neutral-400 text-sm font-medium uppercase tracking-wider">Plan Details</span>
            <span className="text-[var(--netflix-red)] text-sm font-bold cursor-pointer hover:underline">Change</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-neutral-500 text-xs">Monthly subscription</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">${plan.price}</p>
              <p className="text-neutral-500 text-xs">plus tax</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="flex gap-4 items-start p-4 bg-blue-900/10 rounded-lg border border-blue-900/20 mb-10">
        <ShieldCheck className="w-6 h-6 text-blue-500 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-blue-200 mb-1">Secure Checkout</h4>
          <p className="text-xs text-blue-300/70 leading-relaxed">
            Your personal information is encrypted and protected. You can cancel your subscription online at any time.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={onConfirm}
        className="w-full bg-[var(--netflix-red)] hover:bg-[var(--netflix-red-hover)] text-white h-14 text-lg font-bold rounded-md shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
      >
        Next <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>

      <p className="text-center text-xs text-neutral-500 mt-6 px-4">
        By clicking "Next", you will proceed to the final payment setup step.
      </p>
    </div>
  );
}
