"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, FormEvent } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import HelmetMeta from "@/components/shared/HelmetMeta";

const stripePromise = loadStripe(
  "pk_test_51S3dQaJyhK1JCMi8Znjoo5NoLzEcgBIQ3C0xPnT2KG8yt88Tf0i5tJgLnu9EspJ3Nc6xmugxQ0a0jp51gWRSWRG400A2YuzVzP",
);

interface CheckoutFormProps {
  onSuccess: () => void;
}

function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const card = elements.getElement(CardElement);

    const { error } = await stripe.createToken(card);
    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      localStorage.setItem("paymentStatus", "success");
      setMessage("Payment successful! ✅");
      setTimeout(() => onSuccess(), 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div className="relative">
        <div className="bg-black rounded-md px-4 py-3 border border-neutral-700 focus-within:border-white transition-colors">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#ffffff",
                  fontFamily:
                    '"Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSmoothing: "antialiased",
                  "::placeholder": {
                    color: "#737373",
                  },
                },
              },
              hidePostalCode: false,
            }}
          />
        </div>
      </div>

      {/* Alert Message */}
      {message && (
        <div className="w-full">
          <Alert className="bg-transparent border-neutral-700 text-white">
            <CheckCircle2Icon className="h-4 w-4 text-white" />
            <AlertDescription className="ml-2 text-white">
              {message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-[#E50914] hover:bg-[#f40612] text-white h-12 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            "Pay Now"
          )}
        </Button>
      </div>
    </form>
  );
}

interface PaymentFormProps {
  onSuccess: () => void;
}

export default function PaymentForm({ onSuccess }: PaymentFormProps) {
  return (
    <div className="w-full max-w-[500px] mx-auto px-6 py-8">
      <HelmetMeta
        name="Payment"
        description="Secure payment for your Netflix subscription. Enter your card details to complete your subscription."
      />
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center flex-shrink-0">
          <Lock className="h-5 w-5 text-neutral-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Payment Details</h2>
          <p className="text-sm text-neutral-400">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>

      {/* Test Credentials */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-6">
        <p className="text-sm font-medium text-white mb-2">Test Credentials:</p>
        <div className="text-sm text-neutral-400 space-y-1">
          <p>
            <span className="text-neutral-500">Username:</span>{" "}
            <span className="text-white font-mono">emilys</span>
          </p>
          <p>
            <span className="text-neutral-500">Password:</span>{" "}
            <span className="text-white font-mono">emilyspass</span>
          </p>
        </div>
      </div>

      {/* Payment Form Card */}
      <div className="bg-black border border-neutral-800 rounded-lg p-6 mb-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm onSuccess={onSuccess} />
        </Elements>
      </div>

      {/* Security & Payment Methods */}
      <div className="space-y-4">
        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
          <Lock className="h-3.5 w-3.5" />
          <span>Your information is secure and encrypted</span>
        </div>

        {/* Payment Methods Icons */}
        <div className="flex items-center justify-center gap-4 opacity-60">
          <div className="h-6 px-3 border border-neutral-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">VISA</span>
          </div>
          <div className="h-6 px-3 border border-neutral-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">Mastercard</span>
          </div>
          <div className="h-6 px-3 border border-neutral-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">AMEX</span>
          </div>
          <div className="h-6 px-3 border border-neutral-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">Discover</span>
          </div>
        </div>
      </div>
    </div>
  );
}
