"use client";

import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { LoadingFallback } from "@/components/ui";

const Step1CreateAccount = lazy(() => import("./Step1CreateAccount"));
const Step2ChoosePlan = lazy(() => import("./Step2ChoosePlan"));
const PaymentForm = lazy(() => import("../components/PaymentForm"));
const Step3ConfirmSubscription = lazy(() => import("./Step3ConfirmSubscription"));
const Step4SuccessScreen = lazy(() => import("./Step4SuccessScreen"));

const STEPS = [
  { id: 1, name: "Account" },
  { id: 2, name: "Plan" },
  { id: 3, name: "Confirm" },
  { id: 4, name: "Payment" },
  { id: 5, name: "Done" },
];

export default function SubscribePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [accountData, setAccountData] = useState({ email: "", password: "" });
  const [selectedPlanId, setSelectedPlanId] = useState("tier-standard");

  const planNames = {
    "tier-basic": "Basic",
    "tier-standard": "Standard",
    "tier-premium": "Premium",
  };

  const handleNext = (data) => {
    if (data) setAccountData(data);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:py-20 sm:px-6">
      <HelmetMeta
        name="Subscribe to Netflix"
        description="Choose your subscription plan and start watching unlimited movies and TV shows."
      />
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        {currentStep < 5 && (
          <div className="mb-8 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Step <span className="font-bold">{currentStep}</span> of{" "}
              <span className="font-bold">4</span>
            </span>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-black">
          <Suspense fallback={<LoadingFallback />}>
            {currentStep === 1 && <Step1CreateAccount onNext={handleNext} />}
            {currentStep === 2 && (
              <Step2ChoosePlan
                selectedPlanId={selectedPlanId}
                onSelectPlan={setSelectedPlanId}
                onNext={handleNext}
              />
            )}
            {currentStep === 3 && (
              <Step3ConfirmSubscription
                accountData={accountData}
                selectedPlanId={selectedPlanId}
                onConfirm={() => setCurrentStep(4)}
              />
            )}
            {currentStep === 4 && (
              <PaymentForm onSuccess={() => setCurrentStep(5)} />
            )}
            {currentStep === 5 && (
              <Step4SuccessScreen
                planName={planNames[selectedPlanId]}
                onGoHome={() => navigate("/")}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
