import dbConnect from "@/lib/dbConnect";
import { AppError } from "@/utils/AppError";
import { resetPasswordSchema } from "@/validations/user.schema";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/user.model";
import { errorHandler } from "@/lib/errorHandler";

export async function POST(req: NextRequest, { params, }: { params: { token: string; }; }) {

    try {
        await dbConnect();

        // Body
        // =========================
        const body = await req.json();
        const { token } = await params;

        console.log(token)

        // Validate Password
        // =========================
        const parsed = resetPasswordSchema.safeParse(body);

        if (!parsed.success) {
            throw new AppError("Please provide valid password", 400);
        }

        // Hash Incoming Token
        // =========================
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Find Reset Token
        // =========================
        const resetTokenDoc = await User.findOne({ "passwordReset.token": hashedToken, "passwordReset.expiresAt": { $gt: new Date(), }, });

        console.log(resetTokenDoc)

        if (!resetTokenDoc) {
            throw new AppError("Invalid or expired reset token", 400);
        }

        resetTokenDoc.password = parsed.data.password;
        resetTokenDoc.updatedAt = new Date()

        if (resetTokenDoc.passwordReset) {
            resetTokenDoc.passwordReset = {
                token: undefined,
                expiresAt: undefined,
            };
        }

        // pre("save") hash karega
        await resetTokenDoc.save();

        return NextResponse.json(
            {
                success: true,
                message: "Password reset successful",
            },
            { status: 200, }
        );


    } catch (error) {
        return errorHandler(error);
    }
}