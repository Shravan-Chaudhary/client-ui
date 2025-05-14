import Cookies from "js-cookie";

// Cookie names
export const AUTH_TOKENS = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
};

// Cookie options - Standardized across the application
export const COOKIE_OPTIONS = {
    path: "/",
    domain:
        process.env.NEXT_PUBLIC_COOKIE_DOMAIN || (process.env.NODE_ENV === "development" ? undefined : "epicfood.live"),
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV !== "development",
};

/**
 * Client-side cookie management
 */
export const clientCookies = {
    // Get a cookie (client-side)
    get: (name: string): string | undefined => {
        return Cookies.get(name);
    },

    // Set a cookie (client-side)
    set: (name: string, value: string, options?: Cookies.CookieAttributes): void => {
        Cookies.set(name, value, {
            ...COOKIE_OPTIONS,
            ...options,
        });
    },

    // Remove a cookie (client-side)
    remove: (name: string): void => {
        Cookies.remove(name, { ...COOKIE_OPTIONS });
    },

    // Get auth token (client-side)
    getAccessToken: (): string | undefined => {
        return clientCookies.get(AUTH_TOKENS.ACCESS_TOKEN);
    },
};

/**
 * API for accessing cookies from client components
 * This makes a call to an API route that accesses cookies server-side
 */
export const getAuthToken = async (): Promise<{ token: string | undefined }> => {
    try {
        const res = await fetch("/api/auth/accessToken");
        if (!res.ok) {
            throw new Error("Failed to get access token");
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching auth token:", error);
        return { token: undefined };
    }
};

/**
 * Refresh the access token
 */
export const refreshAuthToken = async (): Promise<boolean> => {
    try {
        const res = await fetch("/api/auth/refreshToken", {
            method: "POST",
        });

        if (!res.ok) {
            return false;
        }

        const data = await res.json();
        return data.success;
    } catch (error) {
        console.error("Error refreshing auth token:", error);
        return false;
    }
};
