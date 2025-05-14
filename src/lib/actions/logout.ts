"use server";

import { cookies } from "next/headers";
import { AUTH_TOKENS } from "@/lib/cookies";

export const logout = async () => {
    try {
        const response = await fetch(`https://api.epicfood.live/api/v1/auth/api/v1/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${cookies().get(AUTH_TOKENS.ACCESS_TOKEN)?.value}`,
                cookie: `refreshToken=${cookies().get(AUTH_TOKENS.REFRESH_TOKEN)?.value}`,
            },
        });

        if (!response.ok) {
            console.error("Error logging out", response.status);
            return false;
        }

        cookies().delete(AUTH_TOKENS.ACCESS_TOKEN);
        cookies().delete(AUTH_TOKENS.REFRESH_TOKEN);
        return true;
    } catch (error) {
        console.error("Error logging out", error);
    }
};
