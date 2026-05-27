"use client";

import { CheckCircle2, ShieldCheck, Mail, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { useTranslation } from "react-i18next";

const plans = {
  basic: { name: "Basic", price: "7.99" },
  standard: { name: "Standard", price: "12.99" },
  premium: { name: "Premium", price: "17.99" },
};

export default function Step3ConfirmSubscription({ accountData, selectedPlanId, onConfirm }) {
  const { t } = useTranslation();
  const plan = plans[selectedPlanId as keyof typeof plans] || plans.standard;

  return (
    <div className="w-full max-w-[500px] mx-auto px-6 py-12 bg-black text-white">
      <HelmetMeta
        name={t("subscription.confirmSubscription")}
        description={t("subscription.confirmSubscription")}
      />

      {/* Header */}
      <div className="text-center mb-10">
        <CheckCircle2 className="w-16 h-16 text-[#E50914] mx-auto mb-4" />
        <div className="flex items-center justify-center gap-2 mb-2 text-neutral-400">
          <span className="text-xs uppercase tracking-widest font-bold">{t("subscription.step", { current: 3, total: 4 })}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{t("subscription.confirmSubscription")}</h1>
      </div>

      {/* Summary Card */}
      <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 mb-8 shadow-2xl">
        <div className="p-6 border-b border-neutral-800">
          <div className="flex justify-between items-center mb-4">
            <span className="text-neutral-400 text-sm font-medium uppercase tracking-wider">{t("subscription.account")}</span>
            <span className="text-[#E50914] text-sm font-bold cursor-pointer hover:underline">{t("common.edit")}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
              <Mail className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{accountData.email}</p>
              <p className="text-neutral-500 text-xs">{t("auth.password")}: ********</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-neutral-800/30">
          <div className="flex justify-between items-center mb-4">
            <span className="text-neutral-400 text-sm font-medium uppercase tracking-wider">{t("subscription.plan")}</span>
            <span className="text-[#E50914] text-sm font-bold cursor-pointer hover:underline">{t("common.edit")}</span>
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

      {/* Action Button */}
      <Button
        onClick={onConfirm}
        className="w-full bg-[#E50914] hover:bg-[#f40612] text-white h-14 text-lg font-bold rounded-md shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
      >
        {t("common.next")} <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>

      <p className="text-center text-xs text-neutral-500 mt-6 px-4">
        {t("subscription.confirmSubscription")}
      </p>
    </div>
  );
}
