import { NextResponse } from "next/server";

// Define an interface for custom errors that carry status codes
interface HttpError extends Error {
  statusCode?: number;
}

export function errorHandler(error: unknown) {
  console.error("Custom Error:", error);

  let message = "Internal server error";
  let status = 500;

  // 1. Check if it is a standard Error object or inherited class
  if (error instanceof Error) {
    message = error.message;
    
    // Safely check if our custom statusCode property exists
    const httpError = error as HttpError;
    if (typeof httpError.statusCode === "number") {
      status = httpError.statusCode;
    }
  } 
  // 2. Fallback check for raw objects thrown without the Error class
  else if (error && typeof error === "object" && "message" in error) {
    const errorObj = error as { message: unknown };
    message = String(errorObj.message);
  }

  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}
