

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Logo from "@/components/commonFile/Logo";

const VerifySuccessPage = () => {
    
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_40%)]" />

          <CardContent className="relative space-y-6 p-5 sm:p-8">
            
            {/* Success Icon */}
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
                  rounded-3xl
                  bg-gradient-to-br
                  from-green-500
                  to-emerald-600
                  shadow-xl
                  shadow-green-200
                "
              >
                <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
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
                  border-green-100
                  bg-green-50
                  px-3
                  py-1
                  text-[11px]
                  sm:text-xs
                  font-medium
                  text-green-700
                "
              >
                <ShieldCheck className="h-4 w-4" />
                Verification Complete
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
                Email Verified Successfully
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
                Your email address has been successfully verified.
                Your account is now active and ready to use.
              </p>
            </div>

            {/* Info Box */}
            <div
              className="
                rounded-2xl
                border
                border-green-100
                bg-green-50
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
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>

              <p
                className="
                  mt-4
                  text-sm
                  sm:text-base
                  leading-6
                  text-slate-600
                "
              >
                You can now login and access all features of your account.
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
      </main>
    </>
  );
};

export default VerifySuccessPage;