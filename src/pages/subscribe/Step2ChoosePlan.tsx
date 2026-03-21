"use client";

import { memo, useCallback } from "react";
import { Check, Monitor, Users, Download, Headphones, Crown, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface Plan {
  id: string;
  name: string;
  priceMonthly: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  quality: string;
  resolution: string;
  devices: number;
  badge?: string;
}

const PLANS_DATA: Plan[] = [
  {
    id: "tier-basic",
    name: "Basic",
    priceMonthly: "$9.99",
    description: "Perfect for individual viewers",
    icon: Monitor,
    features: [
      "1 screen at a time",
      "Standard Definition (SD)",
      "Unlimited movies and series",
      "Watch on any device",
    ],
    quality: "Good",
    resolution: "480p",
    devices: 1,
  },
  {
    id: "tier-standard",
    name: "Standard",
    priceMonthly: "$15.99",
    description: "Great for couples or small families",
    icon: Users,
    badge: "Most Popular",
    features: [
      "2 screens at a time",
      "High Definition (HD)",
      "Unlimited movies and series",
      "Download for offline viewing",
    ],
    quality: "Better",
    resolution: "1080p",
    devices: 2,
  },
  {
    id: "tier-premium",
    name: "Premium",
    priceMonthly: "$19.99",
    description: "The ultimate streaming experience",
    icon: Crown,
    features: [
      "4 screens at a time",
      "Ultra HD (4K+HDR)",
      "Unlimited movies and series",
      "Download for offline viewing",
      "Priority customer support",
    ],
    quality: "Best",
    resolution: "4K+HDR",
    devices: 4,
  },
];

interface Step2ChoosePlanProps {
  selectedPlanId: string;
  onSelectPlan: (planId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2ChoosePlan = memo(function Step2ChoosePlan({
  selectedPlanId,
  onSelectPlan,
  onNext,
  onBack,
}: Step2ChoosePlanProps) {
  const handlePlanSelect = useCallback(
    (planId: string) => {
      onSelectPlan(planId);
    },
    [onSelectPlan]
  );

  const selectedPlan = PLANS_DATA.find((plan) => plan.id === selectedPlanId);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Plan</h2>
        <p className="text-neutral-400">
          Select the plan that works best for you
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {PLANS_DATA.map((plan) => {
          const IconComponent = plan.icon;
          const isSelected = plan.id === selectedPlanId;

          return (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all duration-300 relative ${
                isSelected
                  ? "border-red-500 ring-2 ring-red-500/30 bg-neutral-800/80"
                  : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-red-600">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <IconComponent
                    className={`w-12 h-12 ${
                      isSelected ? "text-red-500" : "text-neutral-500"
                    }`}
                  />
                </div>
                <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-neutral-400 text-sm">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">
                    {plan.priceMonthly}
                  </span>
                  <span className="text-neutral-400 text-sm">/month</span>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check
                        className={`h-4 w-4 flex-shrink-0 ${
                          isSelected ? "text-red-500" : "text-neutral-500"
                        }`}
                      />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`rounded-md py-2 text-center text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-red-600 text-white"
                      : "bg-neutral-800 text-neutral-300"
                  }`}
                >
                  {isSelected ? "Selected" : "Select Plan"}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison Table */}
      <Card className="border-neutral-800 bg-neutral-900/50 mb-8">
        <CardHeader>
          <CardTitle className="text-lg text-white">Plan Comparison</CardTitle>
          <CardDescription className="text-neutral-400">
            Compare features across all plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-800">
                <TableHead className="text-neutral-400 w-[200px]">Feature</TableHead>
                {PLANS_DATA.map((plan) => (
                  <TableHead
                    key={plan.id}
                    className={`text-center ${
                      plan.id === selectedPlanId ? "text-red-500" : "text-neutral-400"
                    }`}
                  >
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-neutral-800">
                <TableCell className="font-medium text-neutral-300">Price</TableCell>
                {PLANS_DATA.map((plan) => (
                  <TableCell key={plan.id} className="text-center text-white">
                    {plan.priceMonthly}/mo
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="border-neutral-800">
                <TableCell className="font-medium text-neutral-300">Quality</TableCell>
                {PLANS_DATA.map((plan) => (
                  <TableCell key={plan.id} className="text-center text-neutral-300">
                    {plan.quality}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="border-neutral-800">
                <TableCell className="font-medium text-neutral-300">Resolution</TableCell>
                {PLANS_DATA.map((plan) => (
                  <TableCell key={plan.id} className="text-center text-neutral-300">
                    {plan.resolution}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="border-neutral-800">
                <TableCell className="font-medium text-neutral-300">Devices</TableCell>
                {PLANS_DATA.map((plan) => (
                  <TableCell key={plan.id} className="text-center text-neutral-300">
                    {plan.devices}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="border-neutral-800">
                <TableCell className="font-medium text-neutral-300">Downloads</TableCell>
                {PLANS_DATA.map((plan, idx) => (
                  <TableCell key={plan.id} className="text-center">
                    {idx > 0 ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-neutral-600">—</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="border-neutral-800">
                <TableCell className="font-medium text-neutral-300">HDR/4K</TableCell>
                {PLANS_DATA.map((plan, idx) => (
                  <TableCell key={plan.id} className="text-center">
                    {idx === 2 ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-neutral-600">—</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="min-w-[120px] border-neutral-700 text-neutral-300 hover:bg-neutral-800"
          size="lg"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="min-w-[120px] h-12 text-base font-semibold bg-red-600 hover:bg-red-700"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
});

export default Step2ChoosePlan;
