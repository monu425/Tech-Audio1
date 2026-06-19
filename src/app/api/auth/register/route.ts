import dbConnect from "@/lib/dbConnect";
import { errorHandler } from "@/lib/errorHandler";
import User from "@/models/user.model";
import { AppError } from "@/utils/AppError";
import { verificationEmailTemplate } from "@/utils/emailTemplate/generateVerificationEmailTemplate";
import { generateCryptoToken } from "@/utils/generateCryptoToken";
import { sendEmail } from "@/utils/sendEmail";
import { registerSchema } from "@/validations/user.schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let userData;
    try {
        // Database
        // =========================
        await dbConnect()

        // Body
        // =========================
        const body = await req.json();

        const cookieStore = await cookies();

        // Validation
        // =========================
        const parsed = registerSchema.safeParse(body)
        if (!parsed.success) {
            throw new AppError("Please provide all required fields", 400)
        }

        const existingUser = await User.findOne({ email: parsed.data.email })
        if (existingUser) {
            throw new AppError("User already registered with this email.", 400)
        }

        const { generateToken, hashedToken, generateTokenExpireTime } = generateCryptoToken();

        const user = await User.create(
            {
                name: parsed.data.name,
                email: parsed.data.email,
                password: parsed.data.password,
                emailVerification: {
                    token: hashedToken,
                    // expires bhi rakhni chahiye ki nhi baad me dekhunga
                    expiresAt: generateTokenExpireTime
                }
            }
        )

        userData = user;

        const verifyURL = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email/${generateToken}`;

        const message = verificationEmailTemplate({ verifyUrl: verifyURL })

        await sendEmail({
            email: user.email,
            subject: "Verify Your Email Address",
            message: message,
        });

        //  cookie rakhni chahiye ki nhi baad me dekhunga
        cookieStore.set("verify_user", user._id.toString(), {
            maxAge: 15 * 60,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Verification email sent",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            }, { status: 201, }
        );

    } catch (error) {
        await User.findByIdAndDelete(userData?._id);
        return errorHandler(error);
    }
}