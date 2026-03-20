import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/shared";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { mutate: loginUser, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginUser(
      {
        email,
        password,
      },
      {
        onSuccess: (response) => {
          // Store token based on remember me option
          if (rememberMe) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
          } else {
            // Session storage for temporary login
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("user", JSON.stringify(response.user));
          }
          // Redirect to home page
          navigate("/");
        },
      },
    );
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[450px] bg-black/75 rounded-lg px-8 py-16 md:px-16 md:py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-[#e87c7c] text-white text-sm">
            {(error as Error).message ||
              "Login failed. Please check your credentials."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
              className="peer w-full bg-[#333] border-0 rounded text-white px-4 py-4 h-12 placeholder-transparent focus:outline-none focus:ring-0 focus:bg-[#454545] transition-colors"
            />
            <label className="absolute left-4 top-4 text-[#8c8c8c] text-base pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white bg-[#333] px-1 peer-focus:bg-black peer-not-placeholder-shown:bg-black">
              Email or phone number
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

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full bg-[#e50914] hover:bg-[#f40612] text-white font-semibold py-3 rounded text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex items-center justify-between text-sm text-[#737373] mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-[#333] text-[#e50914] focus:ring-[#e50914] focus:ring-2"
              />
              <label
                htmlFor="remember"
                className="text-[#737373] cursor-pointer hover:text-white transition-colors"
              >
                Remember me
              </label>
            </div>
            <Link to="#" className="hover:underline">
              Need help?
            </Link>
          </div>
        </form>

        <div className="mt-16 text-[#737373] flex flex-col gap-4">
          <p className="text-base">
            New to Netflix?{" "}
            <Link
              to="/signup"
              className="text-white hover:underline font-medium"
            >
              Sign up now.
            </Link>
          </p>
          <p className="text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <Link to="#" className="text-blue-500 hover:underline">
              Learn more.
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
