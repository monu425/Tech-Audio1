"use client";

import { useState } from "react";

import { Mail } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {  emailSchema, ForgotPasswordInput } from "@/validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldDescription } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import Logo from "@/components/commonFile/Logo";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async(values: ForgotPasswordInput ) => {
    try {
      setLoading(true);
      const email = values.email

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      } else{
        toast.success(data.message)
        router.push("/forgot-password/email-send");

      }
      
    } catch (error) {
      if (error instanceof Error) {
        toast.error( error.message );
      }
      
    } finally{
      setLoading(false);
    }
  };


  

  return (
    <>
      <header className="flex items-center justify-between py-5">
        <Logo />
      </header>

      <div className="flex flex-col items-center justify-center py-8 mt-4">
        <Card className="w-full max-w-md rounded-2xl shadow-lg border py-8">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-xl sm:text-2xl font-semibold">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Enter your email to receive password reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-5">
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <Input
                  type="email"
                  placeholder="Enter your email"
                  className=" h-10 w-full rounded-xl pl-10 sm:h-11 sm:pl-11 md:h-12 md:pl-12 text-sm md:text-base"
                  autoComplete="email"
                  {...form.register("email")}
                />
              </div>
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}

              {/* Button */}
              <Button
                className="w-full h-12 sm:h-13 rounded-xl text-base"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <FieldDescription className="px-6 py-3 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </>
  );
}
