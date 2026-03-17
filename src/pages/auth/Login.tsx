import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/queries";

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
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-500/20 border border-red-500 text-red-400 text-sm">
              {(error as Error).message ||
                "Login failed. Please check your credentials."}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isPending}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="mt-6 w-full bg-[var(--netflix-red)] hover:bg-[#c11119] text-white font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>

            <div className="flex items-center justify-between text-sm text-[#b3b3b3] mt-2 group">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label
                  htmlFor="remember"
                  className="text-[#b3b3b3] cursor-pointer group-hover:text-white transition-colors"
                >
                  Remember me
                </Label>
              </div>
              <Link to="#" className="hover:underline">
                Need help?
              </Link>
            </div>
          </form>

          <div className="mt-16 text-[#b3b3b3] flex flex-col gap-4">
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
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
