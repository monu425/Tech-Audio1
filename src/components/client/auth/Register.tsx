"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { RegisterInput, registerSchema } from "@/validations/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Logo from "@/components/commonFile/Logo";
import errorPageHandler from "@/components/commonFile/errorPageHandler";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { register } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterInput) => {
    console.log("hlo");
    try {
      setLoading(true);

      const res = await register(
        values.name,
        values.email,
        values.password,
        values.confirmPassword,
      );

      if (res) {
        toast.success("Register Successfull");
        router.push("/verify-email");
      }

      console.log(res);
    } catch (error) {
      errorPageHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between py-5">
        <Logo />

        <Link
          href="/login"
          className="rounded-lg border px-4 py-2 text-xs md:text-base font-medium transition-all duration-200 hover:bg-gray-100"
        >
          Login
        </Link>
      </header>

      {/* Form */}
      <div className="flex flex-col items-center py-3">
        <Card className="w-full max-w-md border py-6 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-semibold">
              Create account
            </CardTitle>
            <CardDescription className="text-xs">
              Sign up to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 md:space-y-4">
            <form
              className="space-y-3 md:space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* name */}
              <div>
                <div className="relative w-full">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="h-11 w-full pl-11 text-sm md:text-base md:h-12 md:pl-12"
                    {...form.register("name")}
                  />
                </div>
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* email */}
              <div>
                <div className="relative w-full">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your Email"
                    className="h-11 w-full pl-11 text-sm md:text-base md:h-12 md:pl-12"
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div>
                <div className="relative w-full">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 w-full pl-11 text-sm md:text-base md:h-12 md:pl-12"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPass ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* confirm password */}
              <div>
                <div className="relative w-full">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 w-full pl-11 text-sm md:text-base md:h-12 md:pl-12"
                    {...form.register("confirmPassword")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="h-10 md:h-12 w-full text-sm md:text-base"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative text-center text-sm md:text-base">
              <span className="relative z-10 bg-white px-2 text-muted-foreground">
                or continue with
              </span>
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            {/* footer */}

            <p className="text-center text-sm md:text-base text-muted-foreground">
              Already have an account ?{" "}
              <Link
                href="/login"
                className="font-medium cursor-pointer hover:underline"
              >
                {loading ? "Signing in..." : "Sign in"}
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* terms */}
        <FieldDescription className="px-6 py-3">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </FieldDescription>
      </div>
    </>
  );
};

export default Register;
