import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <Card>
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-500/20 border border-red-500 text-red-400 text-sm">
              {(error as Error).message || "Signup failed. Please try again."}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isPending}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isPending}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="mt-6 w-full bg-[var(--netflix-red)] hover:bg-[#c11119] text-white font-semibold py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-10 text-[#b3b3b3]">
            <p className="text-base text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white hover:underline font-medium"
              >
                Sign In.
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
