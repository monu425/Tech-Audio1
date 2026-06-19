import React from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import Logo from "@/components/commonFile/Logo";

const VerifyError = () => {
  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between py-5">
        <Logo />
      </header>

      {/* Content */}
      <div className="flex items-center justify-center mt-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="text-red-500 w-16 h-16" />
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Verification Failed
          </h1>

          <p className="text-gray-60 text-sm 0 mb-6">
            Your email verification link is invalid or has expired.
          </p>

          <Link
            href="/login"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition text-base" 
          >
            Go to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default VerifyError;
