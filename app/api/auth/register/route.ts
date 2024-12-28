// app/api/v1/auth/signup/route.ts
import { NextResponse } from "next/server";
import { User } from "@/models/user.model";
import { connect } from "@/utils/connection";
import { createToken, setSession } from "@/lib/auth/auth";

export async function POST(req: Request) {
  try {
    await connect();
    const { username, email, password } = await req.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });

    // Generate token
    const token = await createToken({ id: user._id });
    setSession(token);

    // Return response without password
    return NextResponse.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    }, { status: 201 });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
