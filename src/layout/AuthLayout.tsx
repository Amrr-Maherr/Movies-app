import { ReactNode } from "react";
import authBg from "@/assets/images/auth_bg.jpg";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black flex flex-col sm:bg-transparent">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${authBg})`,
        }}
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/60" />

      <main className="relative z-10 py-30 flex flex-col justify-center items-center min-h-screen">
        {children}
      </main>
    </div>
  );
}
