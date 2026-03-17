import { ReactNode } from "react";
import authBg from "@/assets/images/auth_bg.jpg";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${authBg})`,
        }}
      />

      {/* Dark overlay - Netflix style */}
      <div className="absolute inset-0 bg-black/80" />

      <main className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-8">
        {children}
      </main>
    </div>
  );
}
