import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/queries";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const { mutate: signupUser, isPending, error } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      return;
    }

    signupUser(
      {
        name,
        email,
        password,
        rePassword: confirmPassword,
        phone,
      },
      {
        onSuccess: (response) => {
          // Store token in localStorage
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          // Redirect to home page after short delay
          setTimeout(() => {
            navigate("/");
          }, 1500);
        },
      },
    );
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[450px] bg-black/75 rounded-lg px-8 py-16 md:px-16 md:py-12">
        <h1 className="text-3xl font-bold text-white mb-8">
          Create an Account
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-[#e87c7c] text-white text-sm">
            {(error as Error).message || "Signup failed. Please try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isPending}
              className="peer w-full bg-[#333] border-0 rounded text-white px-4 py-4 h-12 placeholder-transparent focus:outline-none focus:ring-0 focus:bg-[#454545] transition-colors"
            />
            <label className="absolute left-4 top-4 text-[#8c8c8c] text-base pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white bg-[#333] px-1 peer-focus:bg-black peer-not-placeholder-shown:bg-black">
              Name
            </label>
          </div>

          <div className="relative">
            <Input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
              className="peer w-full bg-[#333] border-0 rounded text-white px-4 py-4 h-12 placeholder-transparent focus:outline-none focus:ring-0 focus:bg-[#454545] transition-colors"
            />
            <label className="absolute left-4 top-4 text-[#8c8c8c] text-base pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white bg-[#333] px-1 peer-focus:bg-black peer-not-placeholder-shown:bg-black">
              Email
            </label>
          </div>

          <div className="relative">
            <Input
              type="tel"
              placeholder=" "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={isPending}
              className="peer w-full bg-[#333] border-0 rounded text-white px-4 py-4 h-12 placeholder-transparent focus:outline-none focus:ring-0 focus:bg-[#454545] transition-colors"
            />
            <label className="absolute left-4 top-4 text-[#8c8c8c] text-base pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white bg-[#333] px-1 peer-focus:bg-black peer-not-placeholder-shown:bg-black">
              Phone
            </label>
          </div>

          <div className="relative">
            <Input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isPending}
              className="peer w-full bg-[#333] border-0 rounded text-white px-4 py-4 h-12 placeholder-transparent focus:outline-none focus:ring-0 focus:bg-[#454545] transition-colors"
            />
            <label className="absolute left-4 top-4 text-[#8c8c8c] text-base pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white bg-[#333] px-1 peer-focus:bg-black peer-not-placeholder-shown:bg-black">
              Password
            </label>
          </div>

          <div className="relative">
            <Input
              type="password"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isPending}
              className="peer w-full bg-[#333] border-0 rounded text-white px-4 py-4 h-12 placeholder-transparent focus:outline-none focus:ring-0 focus:bg-[#454545] transition-colors"
            />
            <label className="absolute left-4 top-4 text-[#8c8c8c] text-base pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white bg-[#333] px-1 peer-focus:bg-black peer-not-placeholder-shown:bg-black">
              Confirm Password
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full bg-[#e50914] hover:bg-[#f40612] text-white font-semibold py-3 rounded text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-10 text-[#737373]">
          <p className="text-base text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
