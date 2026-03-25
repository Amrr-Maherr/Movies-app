"use client";

import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HelmetMeta from "@/components/shared/HelmetMeta";

const PLANS = [
  {
    id: "tier-basic",
    name: "Basic",
    price: "$9.99",
    features: ["1 screen", "SD 480p", "Unlimited movies"],
  },
  {
    id: "tier-standard",
    name: "Standard",
    price: "$15.99",
    badge: "Most Popular",
    features: ["2 screens", "HD 1080p", "Downloads included"],
  },
  {
    id: "tier-premium",
    name: "Premium",
    price: "$19.99",
    features: ["4 screens", "4K + HDR", "Priority support"],
  },
];

export default function Step2ChoosePlan({
  selectedPlanId,
  onSelectPlan,
  onNext,
}) {
  return (
    <div className="w-full max-w-[900px] mx-auto px-6 py-8">
      <HelmetMeta
        name="Choose Your Plan"
        description="Select the perfect Netflix subscription plan for your needs. Basic, Standard, or Premium."
      />
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Choose the plan that's right for you
        </h1>
        <p className="text-neutral-400 text-sm">
          Join Netflix and select your monthly subscription
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {PLANS.map((plan) => {
          const isSelected = plan.id === selectedPlanId;

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan.id)}
              className={`cursor-pointer relative overflow-hidden rounded-lg border transition-all ${
                isSelected
                  ? "border-white bg-neutral-900"
                  : "border-neutral-800 bg-black hover:border-neutral-600"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-[#E50914] text-white border-0 text-xs px-2 py-0.5">
                    <Star className="h-2.5 w-2.5 mr-1 fill-current" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="p-5 space-y-4">
                {/* Plan Name & Price */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-neutral-400 text-xs">/month</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 pt-4 border-t border-neutral-800">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? "bg-white" : "bg-neutral-800"
                        }`}
                      >
                        <Check
                          className={`h-3 w-3 ${
                            isSelected ? "text-black" : "text-neutral-400"
                          }`}
                        />
                      </div>
                      <span
                        className={
                          isSelected ? "text-white" : "text-neutral-400"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Select Indicator */}
                <div
                  className={`pt-4 text-center text-sm font-medium ${
                    isSelected ? "text-white" : "text-neutral-500"
                  }`}
                >
                  {isSelected ? "Selected" : "Select Plan"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button
          onClick={onNext}
          className="bg-[#E50914] hover:bg-[#f40612] text-white font-medium px-10 h-12 disabled:opacity-50"
          size="lg"
        >
          Continue
        </Button>
      </div>

      {/* Features List */}
      <div className="mt-12 space-y-4">
        <h3 className="text-lg font-semibold text-white text-center mb-6">
          What's included with your subscription
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {[
            "Unlimited movies and TV shows",
            "Download & watch offline",
            "Watch on any device",
            "Cancel anytime",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Check className="h-5 w-5 text-white flex-shrink-0" />
              <span className="text-neutral-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
