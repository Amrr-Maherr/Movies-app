"use client";

import { CheckCircle2, Play, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Step4SuccessScreen({ planName, onGoHome }) {
  return (
    <div className="w-full max-w-[500px] mx-auto px-6 py-8">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-black" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">You're all set!</h1>
        <p className="text-neutral-400 text-sm">
          Your <span className="text-white font-medium">{planName}</span>{" "}
          subscription is now active
        </p>
      </div>

      {/* Plan Badge */}
      <div className="flex justify-center mb-8">
        <Badge className="bg-neutral-900 border border-neutral-700 text-white px-4 py-1.5 text-xs">
          <CheckCircle2 className="h-3 w-3 mr-1.5" />
          Subscription Active
        </Badge>
      </div>

      {/* What's Included */}
      <div className="border border-neutral-800 rounded-lg p-5 mb-8 bg-black">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center">
            <Play className="h-4 w-4 text-white fill-white" />
          </div>
          <h3 className="text-sm font-semibold text-white">What's included</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Play, text: "Unlimited movies & TV" },
            { icon: CheckCircle2, text: "Download & watch offline" },
            { icon: CheckCircle2, text: "Watch on any device" },
            { icon: CheckCircle2, text: "Cancel anytime" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-md bg-neutral-900"
            >
              <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm text-neutral-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => (window.location.href = "/")}
          className="w-full h-12 bg-[#E50914] hover:bg-[#f40612] text-white font-medium"
          size="lg"
        >
          <Play className="mr-2 h-5 w-5 fill-current" />
          Start Watching Now
        </Button>
        <Button
          onClick={onGoHome}
          variant="outline"
          className="w-full h-12 border-neutral-700 bg-transparent text-white hover:bg-neutral-900 hover:text-white"
        >
          <Home className="mr-2 h-5 w-5" />
          Go to Home
        </Button>
      </div>

      {/* Email Confirmation */}
      <div className="mt-8 text-center">
        <p className="text-xs text-neutral-500 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          Confirmation email sent to your inbox
        </p>
      </div>
    </div>
  );
}
