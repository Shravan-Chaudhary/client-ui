import { cookies } from "next/headers";

export async function POST() {
    const response = await fetch(`https://api.epicfood.live/api/v1/auth/api/v1/auth/refresh`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
            Cookie: `refreshToken=${cookies().get("refreshToken")?.value}`,
        },
    });

    if (!response.ok) {
        return Response.json({ success: false, message: "Failed to refresh token" });
    }

    const c = response.headers.getSetCookie();
    const accessTokenHeader = c.find((cookie) => cookie.includes("accessToken"));
    const refreshTokenHeader = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessTokenHeader || !refreshTokenHeader) {
        return Response.json({ success: false, message: "Token missing" });
    }

    try {
        // Extract token value and expiry from cookie header string using regex
        // Format example: "accessToken=xyz; Domain=epicfood.live; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600"
        const accessTokenMatch = accessTokenHeader.match(/^accessToken=([^;]+)/);
        const refreshTokenMatch = refreshTokenHeader.match(/^refreshToken=([^;]+)/);
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
            name: "accessToken",
            value: accessTokenValue,
            expires: accessExpiry,
            httpOnly: true,
            path: "/",
            domain: "epicfood.live",
            sameSite: "strict",
        });

        cookies().set({
            name: "refreshToken",
            value: refreshTokenValue,
            expires: refreshExpiry,
            httpOnly: true,
            path: "/",
            domain: "epicfood.live",
            sameSite: "strict",
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
