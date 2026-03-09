import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI Only - no real authentication
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="mt-6 w-full bg-[var(--netflix-red)] hover:bg-[#c11119] text-white font-semibold py-6 text-base"
            >
              Sign In
            </Button>
            
            <div className="flex items-center justify-between text-sm text-[#b3b3b3] mt-2 group">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-[#b3b3b3] cursor-pointer group-hover:text-white transition-colors">
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
              <Link to="/signup" className="text-white hover:underline font-medium">
                Sign up now.
              </Link>
            </p>
            <p className="text-xs">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
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
