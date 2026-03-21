"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/shared";

export default function Step1CreateAccount({ onNext }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { mutate: loginUser, isPending, error: apiError } = useLogin();

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    loginUser(
      {
        email,
        password,
      },
      {
        onSuccess: (response) => {
          console.log(response);
          localStorage.setItem("token", response?.accessToken);
          localStorage.setItem("name", JSON.stringify(response.firstName));
          localStorage.setItem("image", JSON.stringify(response.image));
          localStorage.setItem("email", JSON.stringify(response.email));
          onNext({ email, password });
        },
        onError: (err) => {
          setError((err as Error).message || "Login failed");
        },
      },
    );
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
        <p className="text-neutral-400 text-sm">
          Create your account to get started
        </p>
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

      {/* Form */}
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300 block">
            Email
          </label>
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="h-12 bg-black border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white focus:ring-0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300 block">
            Password
          </label>
          <Input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="h-12 bg-black border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-white focus:ring-0"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full h-12 bg-[#E50914] hover:bg-[#f40612] text-white font-medium disabled:opacity-50"
          size="lg"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        <p className="text-xs text-center text-neutral-500 leading-relaxed pt-4">
          By continuing, you agree to our{" "}
          <a
            href="/terms-of-use"
            className="text-neutral-400 hover:text-white underline"
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-neutral-400 hover:text-white underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
