"use client";

import { CheckCircle2, Play, LayoutGrid, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { useTranslation } from "react-i18next";

export default function Step4SuccessScreen({ planName, onGoHome }) {
  const { t } = useTranslation();
  const userName = JSON.parse(localStorage.getItem("name") || '"User"');

  return (
    <div className="w-full max-w-[600px] mx-auto px-6 py-16 bg-black text-white text-center">
      <HelmetMeta
        name={t("subscription.success")}
        description={t("subscription.successMessage")}
      />

      <div className="mb-10">
        <div className="relative inline-block">
          <CheckCircle2 className="w-24 h-24 text-[#E50914] mx-auto" />
          <div className="absolute inset-0 bg-[#E50914] blur-3xl opacity-20 -z-10" />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("subscription.success")}, {userName}!</h1>
      <p className="text-xl text-neutral-400 mb-10 max-w-[450px] mx-auto">
        {t("subscription.successMessage")}
      </p>

      {/* Features Recap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
        <div className="p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 flex flex-col items-center text-center">
          <Play className="w-8 h-8 text-[#E50914] mb-3" />
          <p className="text-sm font-medium">Unlimited Streaming</p>
        </div>
        <div className="p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 flex flex-col items-center text-center">
          <LayoutGrid className="w-8 h-8 text-[#E50914] mb-3" />
          <p className="text-sm font-medium">Multi-Device Access</p>
        </div>
        <div className="p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 flex flex-col items-center text-center">
          <User className="w-8 h-8 text-[#E50914] mb-3" />
          <p className="text-sm font-medium">Personalized Profiles</p>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={onGoHome}
          className="w-full bg-[#E50914] hover:bg-[#f40612] text-white h-16 text-xl font-bold rounded-md shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6 fill-current" />
          Start Watching
        </Button>
        
        <p className="text-sm text-neutral-500">
          We've sent a confirmation email with all the details of your membership.
        </p>
      </div>
    </div>
  );
}
