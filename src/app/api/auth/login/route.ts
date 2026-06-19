import dbConnect from "@/lib/dbConnect";
import { errorHandler } from "@/lib/errorHandler";
import User from "@/models/user.model";
import { AppError } from "@/utils/AppError";
import { signToken } from "@/utils/jwtToken";
import { loginSchema } from "@/validations/user.schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_EXPIRES_IN = Number( process.env.COOKIE_EXPIRES_IN ) || 7;

export async function POST(req: NextRequest) {
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
        const parsed = loginSchema.safeParse(body)
        if (!parsed.success) {
            throw new AppError("Please provide all required fields", 400)
        }

        const user = await User.findOne({ email: parsed.data.email }).select("+password");


        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }

        const isMatch = await user.comparePassword(parsed.data.password);
        if (!isMatch) {
            throw new AppError("Invaild Credentials", 401);
        }


        if (user.isBlocked) throw new AppError("Account blocked", 403);

        await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

         const token = signToken({
            id: user.id.toString(),
            email: user.email,
            role: user.role
        });

        cookieStore.set( "auth_token", token, {expires: new Date(Date.now() + COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/",});


        return NextResponse.json(
            {
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.profile?.avatar
                },
                message: "Log in..",
            }, { status: 200, });

    } catch (error) {
        return errorHandler(error);
    }

}