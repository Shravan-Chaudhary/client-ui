import { cookies } from "next/headers";
import { AUTH_TOKENS, COOKIE_OPTIONS } from "@/lib/cookies";

export async function POST() {
    const response = await fetch(`https://api.epicfood.live/api/v1/auth/api/v1/auth/refresh`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${cookies().get(AUTH_TOKENS.ACCESS_TOKEN)?.value}`,
            Cookie: `refreshToken=${cookies().get(AUTH_TOKENS.REFRESH_TOKEN)?.value}`,
        },
    });

    if (!response.ok) {
        return Response.json({ success: false, message: "Failed to refresh token" });
    }

    const c = response.headers.getSetCookie();
    const accessTokenHeader = c.find((cookie) => cookie.includes(AUTH_TOKENS.ACCESS_TOKEN));
    const refreshTokenHeader = c.find((cookie) => cookie.includes(AUTH_TOKENS.REFRESH_TOKEN));

    if (!accessTokenHeader || !refreshTokenHeader) {
        return Response.json({ success: false, message: "Token missing" });
    }

    try {
        // Extract token value and expiry from cookie header string using regex
        // Format example: "accessToken=xyz; Domain=epicfood.live; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600"
        const accessTokenMatch = accessTokenHeader.match(new RegExp(`^${AUTH_TOKENS.ACCESS_TOKEN}=([^;]+)`));
        const refreshTokenMatch = refreshTokenHeader.match(new RegExp(`^${AUTH_TOKENS.REFRESH_TOKEN}=([^;]+)`));
        const accessExpiryMatch = accessTokenHeader.match(/Max-Age=(\d+)/);
        const refreshExpiryMatch = refreshTokenHeader.match(/Max-Age=(\d+)/);

        if (!accessTokenMatch || !refreshTokenMatch) {
            throw new Error("Invalid cookie format");
        }

        const accessTokenValue = accessTokenMatch[1];
        const refreshTokenValue = refreshTokenMatch[1];

        // Calculate expiry from Max-Age
        const now = new Date();
        const accessExpiry = accessExpiryMatch
            ? new Date(now.getTime() + parseInt(accessExpiryMatch[1]) * 1000)
            : new Date(now.getTime() + 3600 * 1000); // Default 1 hour

        const refreshExpiry = refreshExpiryMatch
            ? new Date(now.getTime() + parseInt(refreshExpiryMatch[1]) * 1000)
            : new Date(now.getTime() + 7 * 24 * 3600 * 1000); // Default 7 days

        cookies().set({
            name: AUTH_TOKENS.ACCESS_TOKEN,
            value: accessTokenValue,
            expires: accessExpiry,
            httpOnly: true,
            ...COOKIE_OPTIONS,
        });

        cookies().set({
            name: AUTH_TOKENS.REFRESH_TOKEN,
            value: refreshTokenValue,
            expires: refreshExpiry,
            httpOnly: true,
            ...COOKIE_OPTIONS,
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error("Error processing token refresh:", error);
        return Response.json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to process refresh tokens",
        });
    }
}
