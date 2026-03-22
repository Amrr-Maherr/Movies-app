"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import Step1CreateAccount from "./subscribe/Step1CreateAccount";
import Step2ChoosePlan from "./subscribe/Step2ChoosePlan";
import PaymentForm from "./subscribe/PaymentForm";
import Step3ConfirmSubscription from "./subscribe/Step3ConfirmSubscription";
import Step4SuccessScreen from "./subscribe/Step4SuccessScreen";

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
    <div className="min-h-screen bg-neutral-950 py-8 px-4 sm:py-30 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        {currentStep < 5 && (
          <div className="mb-10">
            {/* Step Indicators - Hidden on mobile, shown on desktop */}
            <div className="hidden sm:flex justify-between">
              {STEPS.map((step) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-br from-green-500 to-green-600 border-green-500 shadow-lg shadow-green-500/30"
                          : isCurrent
                            ? "bg-gradient-to-br from-red-600 to-red-700 border-red-500 shadow-lg shadow-red-600/40 scale-110"
                            : "border-neutral-700 bg-neutral-800"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5 text-white" strokeWidth={3} />
                      ) : (
                        <span
                          className={`text-sm font-bold ${
                            isCurrent ? "text-white" : "text-neutral-500"
                          }`}
                        >
                          {step.id}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium mt-2 uppercase tracking-wide ${
                        isCurrent
                          ? "text-red-500"
                          : isCompleted
                            ? "text-green-500"
                            : "text-neutral-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Step Indicator - Just dots */}
            <div className="flex justify-center gap-2 sm:hidden">
              {STEPS.map((step) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full transition-all ${
                      isCurrent
                        ? "w-6 bg-red-500"
                        : isCompleted
                          ? "bg-green-500"
                          : "bg-neutral-700"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Step Content */}
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
      </div>
    </div>
  );
}
