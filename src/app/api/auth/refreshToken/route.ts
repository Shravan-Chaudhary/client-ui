import { cookies } from "next/headers";
import cookie from "cookie";

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
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
        return Response.json({ success: false, message: "Token missing" });
    }

    const parsedAccessToken = cookie.parse(accessToken);
    const parsedRefreshToken = cookie.parse(refreshToken);

    cookies().set({
        name: "accessToken",
        value: parsedAccessToken.accessToken!,
        expires: new Date(parsedAccessToken.Expires!),
        httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) ?? true,
        path: parsedAccessToken.Path,
        domain: parsedAccessToken.Domain,
        sameSite: parsedAccessToken.SameSite as "strict",
    });
    cookies().set({
        name: "refreshToken",
        value: parsedRefreshToken.refreshToken!,
        expires: new Date(parsedRefreshToken.Expires!),
        httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) ?? true,
        path: parsedRefreshToken.Path,
        domain: parsedRefreshToken.Domain,
        sameSite: parsedRefreshToken.SameSite as "strict",
    });

    return Response.json({ success: true });
}
