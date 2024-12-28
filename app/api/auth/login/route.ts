// app/api/v1/auth/login/route.ts
import { NextResponse } from "next/server";
import { User } from "@/models/user.model";
import { connect } from "@/utils/connection";
import { setSession, createToken } from "@/lib/auth/auth";

export async function POST(req: Request) {
    try {
        await connect();
        const { email, password } = await req.json();

        // Input validation
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Find user and select password (since it's excluded by default)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }
    console.log("user",user)
        // Compare password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Generate token and set session
        const token = await createToken({ id: user._id });
      await setSession(token);
        // Return user data without sensitive information
        return NextResponse.json({
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            },
            message: "Login successful"
        }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}