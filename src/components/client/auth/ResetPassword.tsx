"use client";

import { useState } from "react";
import Link from "next/link";

import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Logo from "@/components/commonFile/Logo";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between py-5">
        <Logo />
      </header>

      {/* Main */}
      <div className="flex min-h-[80vh] items-center justify-center py-10">

        <Card className="relative w-full max-w-md overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl shadow-black/5">

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_40%)]" />

          <CardContent className="relative space-y-8 p-8 md:p-10">

            {/* Icon */}
            <div className="flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-200">

                <LockKeyhole className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3 text-center">

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-medium text-blue-700">

                <ShieldCheck className="h-4 w-4" />

                Secure Password Reset
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Reset Your Password
              </h1>

              <p className="mx-auto max-w-sm text-sm leading-7 text-slate-500">
                Create a strong new password for your account.
                Make sure it’s secure and easy to remember.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">

              {/* Password */}
              <div className="space-y-2">

                <label className="text-sm font-medium text-slate-700">
                  New Password
                </label>

                <div className="relative">

                  <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="
                      h-12
                      rounded-2xl
                      border-slate-200
                      pl-12
                      pr-12
                      focus:border-blue-500
                      focus:ring-blue-500/20
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">

                <label className="text-sm font-medium text-slate-700">
                  Confirm Password
                </label>

                <div className="relative">

                  <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <Input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    className="
                      h-12
                      rounded-2xl
                      border-slate-200
                      pl-12
                      pr-12
                      focus:border-blue-500
                      focus:ring-blue-500/20
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                className="
                  mt-3
                  h-12
                  w-full
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-200
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:from-blue-500
                  hover:to-indigo-500
                "
              >
                Reset Password
              </Button>
            </form>

            {/* Back */}
            <Link
              href="/login"
              className="
                group
                flex
                items-center
                justify-center
                gap-2
                text-sm
                font-medium
                text-slate-500
                transition
                hover:text-slate-900
              "
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

              Back to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ResetPasswordPage;