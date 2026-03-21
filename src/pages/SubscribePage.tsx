"use client";

import { memo, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import toast from "react-hot-toast";
import Step1CreateAccount from "./subscribe/Step1CreateAccount";
import Step2ChoosePlan from "./subscribe/Step2ChoosePlan";
import Step3ConfirmSubscription from "./subscribe/Step3ConfirmSubscription";
import Step4SuccessScreen from "./subscribe/Step4SuccessScreen";

type Step = 1 | 2 | 3 | 4;

interface AccountData {
  email: string;
  password: string;
}

const STEPS = [
  { number: 1, title: "Create Account" },
  { number: 2, title: "Choose Plan" },
  { number: 3, title: "Confirm" },
  { number: 4, title: "Success" },
] as const;

const SubscribePage = memo(function SubscribePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [accountData, setAccountData] = useState<AccountData>({
    email: "",
    password: "",
  });
  const [selectedPlanId, setSelectedPlanId] = useState<string>("tier-standard");

  const selectedPlanName = useMemo(() => {
    const plans = {
      "tier-basic": "Basic",
      "tier-standard": "Standard",
      "tier-premium": "Premium",
    };
    return plans[selectedPlanId as keyof typeof plans] || "Standard";
  }, [selectedPlanId]);

  const handleStep1Complete = useCallback((data: AccountData) => {
    setAccountData(data);
    setCurrentStep(2);
  }, []);

  const handlePlanSelect = useCallback((planId: string) => {
    setSelectedPlanId(planId);
  }, []);

  const handleStep2Next = useCallback(() => {
    setCurrentStep(3);
  }, []);

  const handleStep2Back = useCallback(() => {
    setCurrentStep(1);
  }, []);

  const handleStep3Next = useCallback(() => {
    setCurrentStep(4);
  }, []);

  const handleStep3Back = useCallback(() => {
    setCurrentStep(2);
  }, []);

  const handleConfirm = useCallback(() => {
    toast.success(
      `Welcome to ${selectedPlanName}! Your subscription is active.`,
      {
        duration: 4000,
        icon: "🎉",
      },
    );
  }, [selectedPlanName]);

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleBackFromStep = useCallback(() => {
    if (currentStep === 2) {
      handleStep2Back();
    } else if (currentStep === 3) {
      handleStep3Back();
    }
  }, [currentStep, handleStep2Back, handleStep3Back]);

  const progressPercentage = useMemo(() => {
    return ((currentStep - 1) / (STEPS.length - 1)) * 100;
  }, [currentStep]);

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        return <Step1CreateAccount onNext={handleStep1Complete} />;
      case 2:
        return (
          <Step2ChoosePlan
            selectedPlanId={selectedPlanId}
            onSelectPlan={handlePlanSelect}
            onNext={handleStep2Next}
            onBack={handleBackFromStep}
          />
        );
      case 3:
        return (
          <Step3ConfirmSubscription
            accountData={accountData}
            selectedPlanId={selectedPlanId}
            onConfirm={handleConfirm}
            onBack={handleBackFromStep}
          />
        );
      case 4:
        return (
          <Step4SuccessScreen
            planName={selectedPlanName}
            onGoHome={handleGoHome}
          />
        );
      default:
        return null;
    }
  }, [
    currentStep,
    selectedPlanId,
    accountData,
    selectedPlanName,
    handleStep1Complete,
    handlePlanSelect,
    handleStep2Next,
    handleBackFromStep,
    handleConfirm,
    handleGoHome,
  ]);

  return (
    <div className="min-h-screen bg-[var(--background-primary)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {currentStep < 4 && (
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Join Netflix
            </h1>
            <p className="text-neutral-400">
              Step {currentStep} of {STEPS.length}:{" "}
              {STEPS[currentStep - 1].title}
            </p>
          </div>
        )}

        {/* Progress Indicator - Hidden on success screen */}
        {currentStep < 4 && (
          <div className="mb-12">
            {/* Progress Bar */}
            <div className="relative h-1 bg-neutral-800 rounded-full mb-8">
              <motion.div
                className="absolute h-full bg-red-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between max-w-2xl mx-auto">
              {STEPS.map((step, index) => {
                const isCompleted = currentStep > step.number;
                const isCurrent = currentStep === step.number;
                const isUpcoming = currentStep < step.number;

                return (
                  <div key={step.number} className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isCompleted
                          ? "bg-green-500 border-green-500"
                          : isCurrent
                            ? "border-red-500 bg-red-500/10"
                            : "border-neutral-700 bg-neutral-800"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5 text-white" />
                      ) : (
                        <span
                          className={`text-sm font-medium ${
                            isCurrent ? "text-red-500" : "text-neutral-500"
                          }`}
                        >
                          {step.number}
                        </span>
                      )}
                    </motion.div>
                    <span
                      className={`mt-2 text-xs font-medium hidden sm:block ${
                        isCurrent
                          ? "text-red-500"
                          : isCompleted
                            ? "text-green-500"
                            : "text-neutral-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
});

export default SubscribePage;
