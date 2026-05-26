"use client";

import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HelmetMeta from "@/components/shared/HelmetMeta";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "7.99",
    quality: "Good",
    resolution: "720p",
    devices: ["Phone", "Tablet", "Computer", "TV"],
  },
  {
    id: "standard",
    name: "Standard",
    price: "12.99",
    quality: "Better",
    resolution: "1080p",
    devices: ["Phone", "Tablet", "Computer", "TV"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "17.99",
    quality: "Best",
    resolution: "4K + HDR",
    devices: ["Phone", "Tablet", "Computer", "TV"],
  },
];

export default function Step2ChoosePlan({ selectedPlanId, onSelectPlan, onNext }) {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-6 py-12 bg-black text-white">
      <HelmetMeta
        name="Choose Your Plan"
        description="Choose the Netflix plan that's right for you."
      />

      {/* Header */}
      <div className="mb-10 max-w-[600px]">
        <div className="flex items-center gap-2 mb-2 text-neutral-400">
          <span className="text-xs uppercase tracking-widest font-bold">Step 2 of 4</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Choose the plan that's right for you</h1>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-lg text-neutral-200">
            <Check className="w-6 h-6 text-[var(--netflix-red)] flex-shrink-0" />
            Watch all you want. Ad-free.
          </li>
          <li className="flex items-center gap-3 text-lg text-neutral-200">
            <Check className="w-6 h-6 text-[var(--netflix-red)] flex-shrink-0" />
            Recommendations just for you.
          </li>
          <li className="flex items-center gap-3 text-lg text-neutral-200">
            <Check className="w-6 h-6 text-[var(--netflix-red)] flex-shrink-0" />
            Change or cancel your plan anytime.
          </li>
        </ul>
      </div>

      {/* Plans Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onSelectPlan(plan.id)}
            className={cn(
              "relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 group",
              selectedPlanId === plan.id
                ? "bg-neutral-900 border-[var(--netflix-red)] ring-1 ring-[var(--netflix-red)]"
                : "bg-neutral-900/40 border-neutral-800 hover:border-neutral-600"
            )}
          >
            {/* Selection indicator */}
            <div className={cn(
              "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold transition-all",
              selectedPlanId === plan.id ? "bg-[var(--netflix-red)] text-white opacity-100" : "bg-neutral-800 text-neutral-400 opacity-0 group-hover:opacity-100"
            )}>
              {selectedPlanId === plan.id ? "SELECTED" : "SELECT"}
            </div>

            <div className="text-center mb-6">
              <h3 className={cn(
                "text-2xl font-bold mb-2",
                selectedPlanId === plan.id ? "text-white" : "text-neutral-400"
              )}>{plan.name}</h3>
              <p className="text-3xl font-bold">${plan.price}<span className="text-sm font-normal text-neutral-500">/mo</span></p>
            </div>

            <div className="space-y-4 pt-6 border-t border-neutral-800">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Video Quality</span>
                <span className="text-sm font-medium">{plan.quality}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Resolution</span>
                <span className="text-sm font-medium">{plan.resolution}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Devices</span>
                <span className="text-xs text-neutral-300 leading-relaxed">
                  {plan.devices.join(", ")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800 mb-10 flex gap-4">
        <Info className="w-6 h-6 text-neutral-500 flex-shrink-0" />
        <p className="text-xs text-neutral-400 leading-relaxed">
          Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details. Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={!selectedPlanId}
          className="w-full max-w-[400px] bg-[var(--netflix-red)] hover:bg-[var(--netflix-red-hover)] text-white h-16 text-xl font-bold rounded-md shadow-lg transition-transform active:scale-[0.98]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
