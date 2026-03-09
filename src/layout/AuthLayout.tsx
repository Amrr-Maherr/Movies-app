import { ReactNode } from "react";
import Logo from "@/components/shared/logo/Logo";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black flex flex-col sm:bg-transparent">
      {/* Background Image - Netflix Cinematic style */}
      <div 
        className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/US-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black via-black/40 to-black/80 sm:bg-gradient-to-b sm:from-black/80 sm:via-transparent sm:to-black/80" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-4 sm:px-12 sm:py-6 z-50">
        <Link to="/">
          <Logo className="w-24 sm:w-40 h-8 sm:h-12" />
        </Link>
      </div>

      {/* Main Content Form */}
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center p-4 sm:p-0 min-h-screen">
        {children}
      </main>
      
      {/* Footer minimal style */}
      <footer className="relative z-10 bg-black/75 mt-auto border-t border-neutral-800 text-neutral-400 py-8 px-8 sm:px-16 text-sm">
        <div className="max-w-5xl mx-auto">
          <p className="mb-6">Questions? Call 1-800-000-0000</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link to="#" className="hover:underline">FAQ</Link>
            <Link to="#" className="hover:underline">Help Center</Link>
            <Link to="#" className="hover:underline">Terms of Use</Link>
            <Link to="#" className="hover:underline">Privacy</Link>
            <Link to="#" className="hover:underline">Cookie Preferences</Link>
            <Link to="#" className="hover:underline">Corporate Information</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
