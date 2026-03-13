import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes (not /admin/login)
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const token = request.cookies.get(COOKIE_NAME)?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        const isValid = await verifyAdminToken(token);
        if (!isValid) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // If logged in and hitting /admin/login, redirect to dashboard
    if (pathname === "/admin/login") {
        const token = request.cookies.get(COOKIE_NAME)?.value;
        if (token) {
            const isValid = await verifyAdminToken(token);
            if (isValid) {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
