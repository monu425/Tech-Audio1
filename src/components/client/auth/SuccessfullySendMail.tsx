"use client"
import React, { useState } from "react";

import Link from "next/link";
import { MailCheck, ArrowLeft, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Logo from "@/components/commonFile/Logo";

const SuccessfullySendMail = () => {
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
      <header className="flex items-center justify-between py-5">
        <Logo />
      </header>

      <div className="flex flex-col items-center justify-center py-8 mt-4">
        <Card className="relative w-full max-w-md overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl shadow-black/5">
          <CardHeader className="flex flex-col items-center justify-center space-y-5 pt-10 text-center">
            {/* Success Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl shadow-green-200">
              <MailCheck className="h-10 w-10 text-white" />
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Email Sent Successfully
              </CardTitle>

              <CardDescription className="mx-auto max-w-sm text-sm leading-6 text-slate-500">
                We’ve sent a password reset link to your email address. Please
                check your inbox and follow the instructions to reset your
                password.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 pb-8">
            {/* Info Box */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-sm text-slate-600">
                Didn’t receive the email?
              </p>

              <button
                disabled={isLoading}
                className="mt-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500 cursor-pointer"
              >
                <span className="flex gap-1">
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}

                {isLoading ? "Sending..." : "Resend email"}
                </span>
              </button>
            </div>

            {/* Login Button */}
            <Link
              href="/login"
              className=" group flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:text-black"
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

export default SuccessfullySendMail;
