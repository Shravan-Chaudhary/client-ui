"use server";

import { cookies } from "next/headers";
import { AUTH_TOKENS, COOKIE_OPTIONS } from "@/lib/cookies";

const register = async (prevState: unknown, formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response = await fetch(`https://api.epicfood.live/api/v1/auth/api/v1/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            return {
                type: "error",
                message: error.message ?? "Error registering account :(",
            };
        }

        const c = response.headers.getSetCookie();
        const accessTokenHeader = c.find((cookie) => cookie.includes(AUTH_TOKENS.ACCESS_TOKEN));
        const refreshTokenHeader = c.find((cookie) => cookie.includes(AUTH_TOKENS.REFRESH_TOKEN));

        if (!accessTokenHeader || !refreshTokenHeader) {
            return {
                type: "error",
                message: "No token found",
            };
        }

        try {
            // Extract token value and expiry from cookie header string
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

            return {
                type: "success",
                message: "Account created successfully",
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

export default register;
