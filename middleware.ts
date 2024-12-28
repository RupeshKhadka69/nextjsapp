// steps to do
// 1. import nextResponse
// 2. import the auth functions
// 3. create a router
// 4. create a post route for /api/signup
// 5. create a post route for /api/login
// 6. create a get route for /api/logout
// 7. export the router
// 8. import the router in pages/api/index.ts
// 9. use the router in the express app
// 10. test the routes in the frontend
// 11. test the routes in the backend

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/auth";

export default async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const {pathname} = req.nextUrl;

  //   public routes
  if (["/api/signup", "/api/login"].includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
   // API routes that should be public
   if (pathname.startsWith("/api/auth/login") || pathname.startsWith("/api/auth/register")) {
    return NextResponse.next();
  }

   // Protected routes
   if (!token) {
    // If it's an API route, return unauthorized
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // For pages, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = await verifyToken(token);
  if (!payload) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
// Configure which routes to run middleware on
export const config = {
    matcher: [
      // Protected routes
      "/api/todos/:path*",
      "/api/auth/me",
      "/",
      
      // Public routes that need middleware for redirection
      "/api/login",
      "/api/register",
    ],
  };
