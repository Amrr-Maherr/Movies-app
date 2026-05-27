"use client";

import { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Monitor,
  Users,
  Download,
  Headphones,
  Crown,
} from "lucide-react";
import { getLocalizedLink } from "@/lib/utils/i18n";
import { useTranslation } from "react-i18next";

const PricingSection = memo(function PricingSection() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Memoized: Pre-process tiers with icon components
  const tiers = useMemo(() => [
    {
      name: t('pricing.basic.name'),
      id: "tier-basic",
      href: "#",
      priceMonthly: t('pricing.basic.price'),
      description: t('pricing.basic.description'),
      icon: Monitor,
      features: [
        { text: t('pricing.basic.features.screen'), icon: Monitor },
        { text: t('pricing.basic.features.quality'), icon: Monitor },
        { text: t('pricing.basic.features.unlimited'), icon: Check },
        { text: t('pricing.basic.features.devices'), icon: Check },
      ],
      featured: false,
    },
    {
      name: t('pricing.standard.name'),
      id: "tier-standard",
      href: "#",
      priceMonthly: t('pricing.standard.price'),
      description: t('pricing.standard.description'),
      icon: Users,
      badge: t('pricing.standard.badge'),
      features: [
        { text: t('pricing.standard.features.screens'), icon: Users },
        { text: t('pricing.standard.features.quality'), icon: Monitor },
        { text: t('pricing.standard.features.unlimited'), icon: Check },
        { text: t('pricing.standard.features.download'), icon: Download },
      ],
      featured: true,
    },
    {
      name: t('pricing.premium.name'),
      id: "tier-premium",
      href: "#",
      priceMonthly: t('pricing.premium.price'),
      description: t('pricing.premium.description'),
      icon: Crown,
      features: [
        { text: t('pricing.premium.features.screens'), icon: Users },
        { text: t('pricing.premium.features.quality'), icon: Monitor },
        { text: t('pricing.premium.features.unlimited'), icon: Check },
        { text: t('pricing.premium.features.download'), icon: Download },
        { text: t('pricing.premium.features.support'), icon: Headphones },
      ],
      featured: false,
    },
  ], [t]);

  const handlePlanClick = useCallback(
    (planId: string) => {
      navigate(getLocalizedLink(`/subscribe?plan=${planId}`), { state: { planId } });
    },
    [navigate, i18n.language],
  );

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              {t('home.plans')}
            </h2>
            <p className="text-3xl font-semibold text-white max-w-2xl mx-auto">
              {t('home.pickPlan')}
            </p>
            <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
              {t('home.planDescription')}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center md:flex-row gap-6">
            {tiers.map((tier) => {
              const IconComponent = tier.icon;
              return (
                <div
                  key={tier.id}
                  className={`relative bg-zinc-900 rounded-sm p-6 transition-all duration-300 hover:scale-105 hover:z-10 ${
                    tier.featured ? "ring-2 ring-red-500" : ""
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {tier.badge}
                    </div>
                  )}

                  {/* Tier Icon */}
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-10 h-10 text-red-500" />
                  </div>

                  {/* Title */}
                  <h3
                    id={tier.id}
                    className="text-lg font-bold text-white text-center mb-2"
                  >
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <p className="flex items-baseline gap-x-1 justify-center mb-4">
                    <span className="text-3xl font-semibold text-white">
                      {tier.priceMonthly}
                    </span>
                    <span className="text-sm text-gray-400">{t('pricing.perMonth')}</span>
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-300 text-center mb-6">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <li key={idx} className="flex gap-x-3 items-start">
                          <Icon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">
                            {feature.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Button */}
                  <button
                    onClick={() => handlePlanClick(tier.id)}
                    aria-describedby={tier.id}
                    className={`w-full rounded-md py-3 text-center text-sm font-semibold transition-colors ${
                      tier.featured
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {t('pricing.getStarted')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default PricingSection;
