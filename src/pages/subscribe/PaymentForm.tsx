"use client";

import { useState, FormEvent} from "react";
import { Lock, CreditCard, Calendar, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";
import PaymentIcons from "./PaymentIcons";

interface PaymentFormProps {
  onSuccess: () => void;
}

export default function PaymentForm({ onSuccess }: PaymentFormProps) {
  const [formData, setPaymentData] = useState({
    cardNumber: "4242 4242 4242 4242",
    expiryDate: "12/26",
    cvv: "123",
    name: "Emily Johnson",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("paymentStatus", "success");
      setMessage("Payment successful! Welcome to Netflix. ✅");
      setTimeout(() => onSuccess(), 1500);
    }, 2000);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-6 py-8 bg-black text-white">
      <HelmetMeta
        name="Payment Method"
        description="Set up your payment method to start your Netflix subscription."
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-neutral-400 uppercase tracking-wider font-bold">
            Step 4 of 4
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Set up your credit or debit card</h1>
        <PaymentIcons/>
      </div>

      {/* Demo Credentials Box */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-8">
        <p className="text-sm font-medium text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          Demo Payment Data:
        </p>
        <div className="text-xs text-neutral-400 space-y-1 font-mono">
          <p>Card: <span className="text-white">4242 4242 4242 4242</span></p>
          <p>Expiry: <span className="text-white">12/26</span> | CVV: <span className="text-white">123</span></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div className="relative group">
          <Input
            type="text"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={(e) => setPaymentData({ ...formData, cardNumber: e.target.value })}
            className="h-14 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white focus:ring-0 pl-12"
          />
          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date */}
          <div className="relative group">
            <Input
              type="text"
              placeholder="Expiration Date (MM/YY)"
              value={formData.expiryDate}
              onChange={(e) => setPaymentData({ ...formData, expiryDate: e.target.value })}
              className="h-14 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white focus:ring-0 pl-12"
            />
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />
          </div>

          {/* CVV */}
          <div className="relative group">
            <Input
              type="text"
              placeholder="CVV"
              value={formData.cvv}
              onChange={(e) => setPaymentData({ ...formData, cvv: e.target.value })}
              className="h-14 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white focus:ring-0 pl-12"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />
          </div>
        </div>

        {/* Full Name */}
        <div className="relative group">
          <Input
            type="text"
            placeholder="First Name & Last Name"
            value={formData.name}
            onChange={(e) => setPaymentData({ ...formData, name: e.target.value })}
            className="h-14 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white focus:ring-0 pl-12"
          />
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />
        </div>

        {/* Info Text */}
        <div className="py-4 space-y-3">
          <p className="text-xs text-neutral-400 leading-relaxed">
            By clicking the "Start Membership" button below, you agree to our Terms of Use, Privacy Statement, and that you are over 18.
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Netflix will automatically continue your membership and charge the monthly membership fee to your payment method until you cancel. You may cancel at any time to avoid future charges.
          </p>
        </div>

        {/* Alert Message */}
        {message && (
          <Alert className="bg-green-900/20 border-green-900/50 text-green-400">
            <CheckCircle2Icon className="h-4 w-4" />
            <AlertDescription className="ml-2">
              {message}
            </AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E50914] hover:bg-[#f40612] text-white h-14 text-lg font-semibold transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            "Start Membership"
          )}
        </Button>
      </form>
    </div>
  );
}
