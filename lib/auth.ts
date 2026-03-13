import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";

function getSecret() {
    const secret = process.env.ADMIN_JWT_SECRET;
    if (!secret) throw new Error("ADMIN_JWT_SECRET is not set");
    return new TextEncoder().encode(secret);
}

export async function createAdminToken(): Promise<string> {
    const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(getSecret());
    return token;
}

export async function verifyAdminToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, getSecret());
        return true;
    } catch {
        return false;
    }
}

export async function isAdminAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyAdminToken(token);
}

export { COOKIE_NAME };
