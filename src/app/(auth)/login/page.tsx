
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h2>

        <p className="text-slate-500">
          Sign in to continue planning your next adventure.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Email
          </label>

          <Input
            type="email"
            placeholder="you@example.com"
            className="h-12 rounded-2xl border-slate-200 bg-white"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-sm text-sky-600 hover:text-sky-700"
            >
              Forgot password?
            </Link>
          </div>

          <Input
            type="password"
            placeholder="••••••••"
            className="h-12 rounded-2xl border-slate-200 bg-white"
          />
        </div>

        <Button className="h-12 w-full rounded-2xl bg-sky-600 text-base hover:bg-sky-700">
          Sign In
        </Button>

        <Button
          variant="outline"
          className="h-12 w-full rounded-2xl border-slate-200"
        >
          Continue with Google
        </Button>
      </div>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-sky-600 hover:text-sky-700"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}

