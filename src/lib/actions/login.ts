"use server";
import cookie from "cookie";
import { cookies } from "next/headers";

const login = async (prevState: unknown, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    //TODO: Validation
    try {
        // TODO: Use env for backend url
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/api/v1/auth/login`, {
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
        const accessToken = c.find((cookie) => cookie.includes("accessToken"));
        const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

        if (!accessToken || !refreshToken) {
            return {
                type: "error",
                message: "No token found",
            };
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
        return {
            type: "success",
            message: "Signed in successfully",
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return {
                type: "error",
                message: error.message,
            };
        }
    }
};

export default login;
