"use client";
import React, { useCallback, useEffect, useRef } from "react";
import * as jose from "jose";
import { getAuthToken, refreshAuthToken } from "@/lib/cookies";

const Refresher = ({ children }: { children: React.ReactNode }) => {
    const timeoutId = useRef<NodeJS.Timeout>();

    const startRefresh = useCallback(async () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        try {
            // Get the token using our standardized utility
            const { token } = await getAuthToken();

            if (!token) {
                return;
            }

            // Decode the JWT to get expiration time
            const decodedToken = jose.decodeJwt(token);
            const exp_in_ms = decodedToken.exp! * 1000;
            const currentTime = Date.now();

            // Schedule refresh 5 seconds before token expires
            const refreshTime = exp_in_ms - currentTime - 5000;

            // Don't schedule if token is already expired or will expire too soon
            if (refreshTime <= 0) {
                // Token is already expired or about to expire, refresh now
                await refreshTokenAndRestart();
                return;
            }

            // Schedule token refresh
            timeoutId.current = setTimeout(() => {
                refreshTokenAndRestart();
            }, refreshTime);
        } catch (error: unknown) {
            console.error("Error refreshing tokens", error);
        }
    }, []);

    const refreshTokenAndRestart = async () => {
        try {
            // Use standardized utility to refresh token
            await refreshAuthToken();
        } catch (error) {
            console.error("Error refreshing tokens", error);
        }
        // Restart the process with the new token
        startRefresh();
    };

    useEffect(() => {
        startRefresh();
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, [startRefresh]);

    return <div>{children}</div>;
};

export default Refresher;
