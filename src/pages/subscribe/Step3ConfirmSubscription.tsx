"use client";

import { memo, useMemo, useCallback } from "react";
import { Check, Monitor, Users, Crown, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Plan {
  id: string;
  name: string;
  priceMonthly: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

const PLANS_DATA: Plan[] = [
  {
    id: "tier-basic",
    name: "Basic",
    priceMonthly: "$9.99",
    icon: Monitor,
    features: [
      "1 screen at a time",
      "Standard Definition (SD)",
      "Unlimited movies and series",
      "Watch on any device",
    ],
  },
  {
    id: "tier-standard",
    name: "Standard",
    priceMonthly: "$15.99",
    icon: Users,
    features: [
      "2 screens at a time",
      "High Definition (HD)",
      "Unlimited movies and series",
      "Download for offline viewing",
    ],
  },
  {
    id: "tier-premium",
    name: "Premium",
    priceMonthly: "$19.99",
    icon: Crown,
    features: [
      "4 screens at a time",
      "Ultra HD (4K+HDR)",
      "Unlimited movies and series",
      "Download for offline viewing",
      "Priority customer support",
    ],
  },
];

interface AccountData {
  email: string;
  password: string;
}

interface Step3ConfirmSubscriptionProps {
  accountData: AccountData;
  selectedPlanId: string;
  onConfirm: () => void;
  onBack: () => void;
}

const Step3ConfirmSubscription = memo(function Step3ConfirmSubscription({
  accountData,
  selectedPlanId,
  onConfirm,
  onBack,
}: Step3ConfirmSubscriptionProps) {
  const selectedPlan = useMemo(
    () => PLANS_DATA.find((plan) => plan.id === selectedPlanId),
    [selectedPlanId]
  );

  const PlanIcon = selectedPlan?.icon || Monitor;

  const handleConfirm = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Confirm Your Subscription</h2>
        <p className="text-neutral-400">
          Review your details before confirming
        </p>
      </div>

      <div className="space-y-4">
        {/* Account Summary */}
        <Card className="border-neutral-800 bg-neutral-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-neutral-400" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Email</span>
                <span className="text-white">{accountData.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Summary */}
        <Card className={`border-2 ${selectedPlanId === "tier-standard" ? "border-red-500" : "border-neutral-800"} bg-neutral-900/50`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <PlanIcon className={`h-5 w-5 ${selectedPlanId === "tier-standard" ? "text-red-500" : "text-neutral-400"}`} />
                Selected Plan
              </CardTitle>
              {selectedPlan?.id === "tier-standard" && (
                <Badge variant="default" className="bg-red-600">
                  Most Popular
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{selectedPlan?.name}</h3>
                <p className="text-sm text-neutral-400">Monthly subscription</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">{selectedPlan?.priceMonthly}</span>
                <span className="text-neutral-400 text-sm">/month</span>
              </div>
            </div>

            <Separator className="bg-neutral-800" />

            <div>
              <h4 className="text-sm font-medium text-neutral-300 mb-3">Plan Features</h4>
              <ul className="space-y-2">
                {selectedPlan?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Billing Summary */}
        <Card className="border-neutral-800 bg-neutral-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-neutral-400" />
              Billing Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Subtotal</span>
                <span className="text-white">{selectedPlan?.priceMonthly}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Tax</span>
                <span className="text-green-500">Included</span>
              </div>
              <Separator className="bg-neutral-800" />
              <div className="flex justify-between text-base font-semibold">
                <span className="text-white">Total due today</span>
                <span className="text-white">{selectedPlan?.priceMonthly}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Notice */}
        <div className="text-center">
          <p className="text-xs text-neutral-500">
            By clicking "Confirm Subscription", you agree to our{" "}
            <a href="/terms-of-use" className="text-neutral-400 hover:text-white underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-neutral-400 hover:text-white underline">
              Privacy Policy
            </a>
            . You can cancel anytime.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center pt-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="min-w-[120px] border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            size="lg"
          >
            Back
          </Button>
          <Button
            onClick={handleConfirm}
            className="min-w-[160px] h-12 text-base font-semibold bg-red-600 hover:bg-red-700"
            size="lg"
          >
            Confirm Subscription
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Step3ConfirmSubscription;
