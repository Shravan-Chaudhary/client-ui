"use server";
// import cookie from "cookie";
import { cookies } from "next/headers";

const login = async (prevState: unknown, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await fetch(`https://api.epicfood.live/api/v1/auth/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            return {
                type: "error",
                message: error.message ?? "Error logging in :(",
            };
        }

        const c = response.headers.getSetCookie();
        const accessTokenHeader = c.find((cookie) => cookie.includes("accessToken"));
        const refreshTokenHeader = c.find((cookie) => cookie.includes("refreshToken"));

        if (!accessTokenHeader || !refreshTokenHeader) {
            return {
                type: "error",
                message: "No token found",
            };
        }

        try {
            // Extract token value and expiry from cookie header string
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

            return {
                type: "success",
                message: "Signed in successfully",
            };
        } catch (parseError) {
            console.error("Error parsing cookies:", parseError);
            return {
                type: "error",
                message: "Failed to process authentication tokens",
            };
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return {
                type: "error",
                message: error.message,
            };
        }

        return {
            type: "error",
            message: "An unexpected error occurred",
        };
    }
};

export default login;
