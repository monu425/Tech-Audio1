"use client";

import Link from "next/link";
import { Mail, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import Logo from "@/components/commonFile/Logo";

const VerifyEmailPage = () => {
  const [isLoading, setLoading] = useState(false);
  const handleButton = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between py-5">
        <Logo />
      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center py-6 sm:py-10">
        <Card
          className="
            relative
            w-full
            max-w-md
            overflow-hidden
            rounded-2xl
            sm:rounded-3xl
            border
            border-black/10
            bg-white
            shadow-xl
            sm:shadow-2xl
            shadow-black/5
          "
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_40%)]" />

          <CardContent className="relative space-y-5 p-5 sm:p-8">
            {/* Icon */}
            <div className="flex justify-center">
              <div
                className="
                  flex
                  h-14
                  w-14
                  sm:h-16
                  sm:w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-500
                  to-indigo-600
                  shadow-xl
                  shadow-blue-200
                "
              >
                <Mail className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3 text-center">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-100
                  bg-blue-50
                  px-3
                  py-1
                  text-[11px]
                  sm:text-xs
                  font-medium
                  text-blue-700
                "
              >
                <ShieldCheck className="h-4 w-4" />
                Email Verification Required
              </div>

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  tracking-tight
                  text-slate-900
                "
              >
                Verify Your Email
              </h1>

              <p
                className="
                  mx-auto
                  max-w-sm
                  text-sm
                  sm:text-base
                  leading-6
                  text-slate-500
                "
              >
                We’ve sent a verification link to your registered email address.
                Please verify your email to activate your account.
              </p>
            </div>

            {/* Info Box */}
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-4
                sm:p-5
                text-center
              "
            >
              <div className="flex justify-center">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    shadow-sm
                  "
                >
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              <p
                className="
                  mt-4
                  text-sm
                  sm:text-base
                  text-slate-600
                  leading-6
                "
              >
                Check your inbox and click on the verification link to continue.
              </p>

              <button
                onClick={handleButton}
                disabled={isLoading}
                className="
                  mt-5
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  font-semibold
                  text-blue-600
                  transition
                  hover:text-blue-500
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  cursor-pointer
                "
              >
                <span className="flex gap-1">
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}

                  {isLoading ? "Sending..." : "Resend Verification Email"}
                </span>
              </button>
            </div>

            {/* Button */}
            <div>
              <Link
                href="/login"
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-slate-700
                  transition-all
                  duration-300
                  hover:bg-slate-50
                  hover:text-black
                "
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default VerifyEmailPage;
