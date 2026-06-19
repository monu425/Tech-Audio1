import dbConnect from "@/lib/dbConnect";
import { errorHandler } from "@/lib/errorHandler";
import User from "@/models/user.model";
import { AppError } from "@/utils/AppError";
import { verificationEmailTemplate } from "@/utils/emailTemplate/generateVerificationEmailTemplate";
import { generateCryptoToken } from "@/utils/generateCryptoToken";
import { sendEmail } from "@/utils/sendEmail";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const cookieStore = await cookies();
        const verifyUser = cookieStore.get("verify_user")?.value;

        if (!verifyUser) {
            throw new AppError("Unauthorized", 401);
        }

        const user = await User.findById(verifyUser);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (user.isEmailVerified) {
            throw new AppError("User already verified", 400);
        }

        const { generateToken, hashedToken, generateTokenExpireTime } = generateCryptoToken();

        user.emailVerification = {
            token: hashedToken,
            expiresAt: generateTokenExpireTime
        }

        user.save()

        const verifyURL = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email/${generateToken}`;

        const message = verificationEmailTemplate({ verifyUrl: verifyURL })

        await sendEmail({
            email: user.email,
            subject: "Verify Your Email Address",
            message: message,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Verification email sent",
            }, { status: 201, }
        );

    } catch (error) {
        return errorHandler(error);
    }
}