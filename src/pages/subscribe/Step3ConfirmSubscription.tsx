"use client";

import { Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const PLANS = {
  "tier-basic": {
    name: "Basic",
    price: "$9.99",
    features: ["1 screen", "SD 480p", "Unlimited movies"],
  },
  "tier-standard": {
    name: "Standard",
    price: "$15.99",
    features: ["2 screens", "HD 1080p", "Downloads included"],
  },
  "tier-premium": {
    name: "Premium",
    price: "$19.99",
    features: ["4 screens", "4K + HDR", "Priority support"],
  },
};

export default function Step3ConfirmSubscription({
  accountData,
  selectedPlanId,
  onConfirm,
}) {
  const plan = PLANS[selectedPlanId];

  return (
    <div className="w-full max-w-[550px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Confirm your subscription
        </h1>
        <p className="text-neutral-400 text-sm">
          Review your details before confirming
        </p>
      </div>

      <div className="space-y-4">
        {/* Account */}
        <div className="border border-neutral-800 rounded-lg p-5 bg-black">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-neutral-400" />
            </div>
            <h3 className="text-base font-semibold text-white">Account</h3>
          </div>
          <div className="bg-neutral-900 rounded-md p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-medium text-sm">
                  {(accountData?.email?.charAt(0) || "?").toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-neutral-500">Email Address</p>
                <p className="text-white font-medium truncate">
                  {accountData?.email || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan */}
        <div
          className={`border rounded-lg p-5 bg-black ${
            selectedPlanId === "tier-standard"
              ? "border-white"
              : "border-neutral-800"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                <Check className="h-4 w-4 text-neutral-400" />
              </div>
              <h3 className="text-base font-semibold text-white">
                Selected Plan
              </h3>
            </div>
            {selectedPlanId === "tier-standard" && (
              <Badge className="bg-[#E50914] text-white border-0 text-xs">
                Popular
              </Badge>
            )}
          </div>
          <div className="bg-neutral-900 rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Monthly billing
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-neutral-500 text-xs block mt-0.5">
                  /month
                </span>
              </div>
            </div>

            <Separator className="bg-neutral-800" />

            <ul className="space-y-2 mt-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border border-neutral-800 rounded-lg p-5 bg-black">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-neutral-400" />
            </div>
            <h3 className="text-base font-semibold text-white">
              Payment Method
            </h3>
          </div>
          <div className="bg-neutral-900 rounded-md p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-7 bg-neutral-800 rounded flex items-center justify-center flex-shrink-0">
                <CreditCard className="h-5 w-5 text-neutral-500" />
              </div>
              <span className="text-neutral-400 text-sm">
                •••• •••• •••• 4242
              </span>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="border border-neutral-800 rounded-lg p-5 bg-black">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-neutral-400 block mb-0.5">
                Total due today
              </span>
              <span className="text-xs text-neutral-500">
                Then {plan.price}/month
              </span>
            </div>
            <span className="text-3xl font-bold text-white">{plan.price}</span>
          </div>
        </div>

        {/* Terms */}
        <div className="text-center py-6">
          <p className="text-xs text-neutral-500 leading-relaxed">
            By clicking "Confirm", you agree to our{" "}
            <a
              href="/terms-of-use"
              className="text-neutral-400 hover:text-white underline underline-offset-2"
            >
              Terms of Use
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-neutral-400 hover:text-white underline underline-offset-2"
            >
              Privacy Policy
            </a>
            . You can cancel anytime.
          </p>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center pt-2">
          <Button
            onClick={onConfirm}
            className="bg-[#E50914] hover:bg-[#f40612] text-white font-medium px-10 h-12 disabled:opacity-50"
            size="lg"
          >
            <Check className="mr-2 h-5 w-5" />
            Confirm Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
