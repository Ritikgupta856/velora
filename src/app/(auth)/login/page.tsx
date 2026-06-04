"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async () => {
    try {
      setLoading(true);

      const result = await signIn.email({
        email,
        password,
      });

      console.log(result);

      window.location.href = "/trips";
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/trips",
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-4xl font-bold tracking-tight">
          Welcome back
        </h2>

        <p className="text-slate-500">
          Sign in to continue planning your next adventure.
        </p>
      </div>

      <div className="space-y-5">
        <Button
          variant="outline"
          className="h-12 w-full rounded-2xl"
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-500">
              Or continue with email
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label>Email</label>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label>Password</label>

            <Link href="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <Button
          onClick={handleEmailSignIn}
          disabled={loading}
          className="h-12 w-full rounded-2xl"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </div>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/sign-up">
          Create account
        </Link>
      </p>
    </div>
  );
}