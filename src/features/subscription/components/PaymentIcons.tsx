import { Mastercard, Visa, Paypal, GooglePay, Stripe } from "@thesvg/react";

export default function PaymentIcons() {
  return (
    <div className="flex items-center justify-start gap-[10px]">
      <Mastercard className="h-6 w-6" />
      <Visa className="h-6 w-6" />
      <Paypal className="h-6 w-6" />
      <GooglePay className="h-6 w-6" />
      <Stripe className="h-6 w-6" />
    </div>
  );
}
