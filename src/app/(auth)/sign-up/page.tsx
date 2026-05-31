
// app/(auth)/sign-up/page.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900">
          Create your account
        </h2>

        <p className="text-slate-500">
          Start generating AI-powered travel experiences.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Full Name
          </label>

          <Input
            type="text"
            placeholder="Ritik Gupta"
            className="h-12 rounded-2xl border-slate-200 bg-white"
          />
        </div>

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
          <label className="text-sm font-medium text-slate-700">
            Password
          </label>

          <Input
            type="password"
            placeholder="••••••••"
            className="h-12 rounded-2xl border-slate-200 bg-white"
          />
        </div>

        <Button className="h-12 w-full rounded-2xl bg-sky-600 text-base hover:bg-sky-700">
          Create Account
        </Button>

        <Button
          variant="outline"
          className="h-12 w-full rounded-2xl border-slate-200"
        >
          Continue with Google
        </Button>
      </div>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-sky-600 hover:text-sky-700"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

