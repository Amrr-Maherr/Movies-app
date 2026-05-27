"use client";

import { useState } from "react";
import { ArrowRight, Info, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/shared";
import HelmetMeta from "@/components/shared/HelmetMeta";
import { useTranslation } from "react-i18next";

export default function Step1CreateAccount({ onNext }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");

  const { mutate: loginUser, isPending } = useLogin();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError(t("errors.required"));
      return;
    }

    loginUser(
      {
        email,
        password,
      },
      {
        onSuccess: (response) => {
          localStorage.setItem("token", response?.accessToken);
          localStorage.setItem("name", JSON.stringify(response.firstName));
          localStorage.setItem("image", JSON.stringify(response.image));
          localStorage.setItem("email", JSON.stringify(response.email));
          onNext({ email: response.email, password });
        },
        onError: (err) => {
          setError((err as Error).message || t("auth.loginFailed"));
        },
      },
    );
  };

  return (
    <div className="w-full max-w-[450px] mx-auto px-6 py-12 bg-black/80 rounded-md shadow-xl border border-white/5">
      <HelmetMeta
        name={t("auth.createAccount")}
        description={t("auth.signUpDescription")}
      />
      
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2 text-neutral-400">
          <span className="text-xs uppercase tracking-widest font-bold">{t("subscription.step", { current: 1, total: 4 })}</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">{t("auth.signIn")}</h1>
        <p className="text-neutral-400 text-sm">
          {t("auth.signUpDescription")}
        </p>
      </div>

      {/* Demo Credentials Alert */}
      <div className="bg-blue-900/20 border border-blue-800/50 rounded-md p-4 mb-8 flex gap-3">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-blue-200/80 leading-relaxed">
          <p className="font-bold text-blue-300 mb-1">{t("auth.testCredentials")}</p>
          <p>{t("auth.signUpDescription")}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative group">
            <Input
              type="text"
              placeholder={t("auth.email")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="h-14 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white focus:ring-0 pl-12 transition-all"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />
          </div>

          <div className="relative group">
            <Input
              type="password"
              placeholder={t("auth.password")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="h-14 bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white focus:ring-0 pl-12 transition-all"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />
          </div>
        </div>

        {error && (
          <div className="bg-[#e87c03] text-white text-sm py-3 px-4 rounded-md animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#E50914] hover:bg-[#f40612] text-white h-14 text-lg font-semibold transition-all active:scale-[0.98]"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              {t("buttons.signingIn")}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {t("common.next")} <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </Button>

        <div className="flex items-center justify-between text-sm text-neutral-500 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded bg-neutral-800 border-neutral-700 accent-[#E50914]" defaultChecked />
            <span>{t("auth.rememberMe")}</span>
          </label>
          <a href="#" className="hover:underline">{t("auth.needHelp")}</a>
        </div>
      </form>

      <div className="mt-12 pt-6 border-t border-neutral-800 text-neutral-500 text-sm">
        {t("auth.newToNetflix")} <span className="text-white hover:underline cursor-pointer">{t("auth.signUpNow")}</span>
      </div>
    </div>
  );
}
