import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/user.model";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, { params, }: {
    params: Promise<{ token: string; }>;
}) {
    try {
        await dbConnect();
        const { token } = await params;
        const cookieStore = await cookies();

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const tokenDoc = await User.findOne({
            "emailVerification.token": hashedToken, 
        })

        if (!tokenDoc) {

            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email/error`
            );
        }

        tokenDoc.isEmailVerified = true;

        if (tokenDoc.emailVerification) {
            tokenDoc.emailVerification = {
                token: undefined,
                expiresAt: undefined,
            };
        }
        await tokenDoc.save();

        cookieStore.delete("verify_user");

        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email/success`
        );
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email/error`
        );
    }
}