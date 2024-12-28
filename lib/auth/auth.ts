import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const createToken = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
};
export const getSession = async () => {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  return await verifyToken(token);
};

export async function setSession(token: string) {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}
export async function clearSession() {
  (await cookies()).set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
}
