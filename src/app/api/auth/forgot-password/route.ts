import dbConnect from "@/lib/dbConnect";
import { errorHandler } from "@/lib/errorHandler";
import User from "@/models/user.model";
import { AppError } from "@/utils/AppError";
import { forgotPasswordEmailTemplate } from "@/utils/emailTemplate/generateForgetPasswordEmailTempte";
import { generateCryptoToken } from "@/utils/generateCryptoToken";
import { sendEmail } from "@/utils/sendEmail";
import { emailSchema } from "@/validations/user.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const frontendUrl = process.env.NEXT_PUBLIC_APP_URL;

        // Validate Email
        // =========================
        const parsed = emailSchema.safeParse(body);

        if (!parsed.success) {
            throw new AppError("Please provide a valid email id", 400);
        }

        // Find User
        // =========================
        const user = await User.findOne({ email: parsed.data.email, });

        // Security Reason
        // Always same response
        if (!user) {
            throw new AppError("Your account does not exits", 401)
        }

        // ✅ Safe rate-limiting check
        if (user.passwordReset?.expiresAt && user.passwordReset.expiresAt > new Date()) {
            throw new AppError(
                "A password reset link has already been sent. Please check your email or wait for the link to expire.",
                429
            );
        }

        // Generate Token
        // =========================
        const { generateToken, hashedToken, generateTokenExpireTime } = generateCryptoToken();
        // =========================
        // Save Token
        // =========================
        user.passwordReset = {
            token: hashedToken,
            expiresAt: generateTokenExpireTime,
        }
        user.save()

        // =========================
        // Reset URL
        // =========================
        const resetPasswordURL = `${frontendUrl}/password/reset/${generateToken}`;

        // =========================
        // Email Template
        // =========================
        const message = forgotPasswordEmailTemplate({ name: user.name, resetUrl: resetPasswordURL, });

        // =========================
        // Send Email
        // =========================
        await sendEmail({
            email: parsed.data.email,
            subject: "Tech Audio Password Recovery",
            message,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Reset email sent successfully",
            }, { status: 200, });


    } catch (error) {
        return errorHandler(error);
    }
}