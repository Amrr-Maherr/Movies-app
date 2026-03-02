"use client";

import { Check, Monitor, Users, Download, Headphones, Crown } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    priceMonthly: "$9.99",
    description: "Stream on 1 screen at a time in standard definition (SD).",
    icon: Monitor,
    features: [
      { text: "1 screen at a time", icon: Monitor },
      { text: "Standard Definition (SD)", icon: Monitor },
      { text: "Unlimited movies and series", icon: Check },
      { text: "Watch on any device", icon: Check },
    ],
    featured: false,
  },
  {
    name: "Standard",
    id: "tier-standard",
    href: "#",
    priceMonthly: "$15.99",
    description: "Stream on 2 screens simultaneously in High Definition (HD).",
    icon: Users,
    badge: "Most Popular",
    features: [
      { text: "2 screens at a time", icon: Users },
      { text: "High Definition (HD)", icon: Monitor },
      { text: "Unlimited movies and series", icon: Check },
      { text: "Download for offline viewing", icon: Download },
    ],
    featured: true,
  },
  {
    name: "Premium",
    id: "tier-premium",
    href: "#",
    priceMonthly: "$19.99",
    description: "Stream on 4 screens at the same time in Ultra HD (4K+HDR).",
    icon: Crown,
    features: [
      { text: "4 screens at a time", icon: Users },
      { text: "Ultra HD (4K+HDR)", icon: Monitor },
      { text: "Unlimited movies and series", icon: Check },
      { text: "Download for offline viewing", icon: Download },
      { text: "Priority customer support", icon: Headphones },
    ],
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section className="space-y-10 py-16">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Plans</h2>
        <p className="text-3xl font-semibold text-white max-w-2xl mx-auto">
          Pick the plan that fits your binge
        </p>
        <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
          Stream your favorite movies and series on any device. No hidden fees,
          cancel anytime.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto px-4">
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
              <h3 id={tier.id} className="text-lg font-bold text-white text-center mb-2">
                {tier.name}
              </h3>

              {/* Price */}
              <p className="flex items-baseline gap-x-1 justify-center mb-4">
                <span className="text-3xl font-semibold text-white">
                  {tier.priceMonthly}
                </span>
                <span className="text-sm text-gray-400">/month</span>
              </p>

              {/* Description */}
              <p className="text-sm text-gray-300 text-center mb-6">{tier.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <li key={idx} className="flex gap-x-3 items-start">
                      <Icon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature.text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Button */}
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={`block rounded-md py-3 text-center text-sm font-semibold transition-colors ${
                  tier.featured
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Get started today
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
