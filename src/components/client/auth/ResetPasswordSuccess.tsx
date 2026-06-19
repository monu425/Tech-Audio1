"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/commonFile/Logo";

const ResetPasswordSuccessPage = () => {
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_40%)]" />

          <CardContent className="relative space-y-8 p-8 md:p-10">

            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-200">

                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3 text-center">

              <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-1 text-xs font-medium text-green-700">

                <ShieldCheck className="h-4 w-4" />

                Password Updated
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Password Reset Successful
              </h1>

              <p className="mx-auto max-w-sm text-sm leading-7 text-slate-500">
                Your password has been successfully updated.
                You can now login with your new password.
              </p>
            </div>

            {/* Info Box */}
            <div className="rounded-2xl border border-green-100 bg-green-50 p-5 text-center">

              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">

                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Your account is now secure with your newly updated password.
              </p>
            </div>

            {/* Button */}
            <Button
              asChild
              className="
                h-12
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-green-600
                to-emerald-600
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-green-200
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:from-green-500
                hover:to-emerald-500
              "
            >
              <Link
                href="/login"
                className="flex items-center gap-2"
              >
                Continue to Login

                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ResetPasswordSuccessPage;