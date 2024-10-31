"use client";
import React, { useCallback, useEffect, useRef } from "react";
import * as jose from "jose";

const Refresher = ({ children }: { children: React.ReactNode }) => {
    const timeoutId = useRef<NodeJS.Timeout>();

    const getAccessToken = async () => {
        const res = await fetch("/api/auth/accessToken");
        if (!res.ok) {
            return;
        }
        const accessToken = await res.json();
        return accessToken;
    };

    const startRefresh = useCallback(async () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        try {
            const accessToken = await getAccessToken();
            if (!accessToken) {
                return;
            }
            const token = jose.decodeJwt(accessToken.token);
            const exp_in_ms = token.exp! * 1000;
            const currentTime = Date.now();
            const refreshTime = exp_in_ms - currentTime - 5000;

            timeoutId.current = setTimeout(() => {
                refreshAccesstoken();
            }, refreshTime);
        } catch (error: unknown) {
            console.error("Error refreshing tokens", error);
        }
    }, []);

    const refreshAccesstoken = async () => {
        try {
            const res = await fetch("/api/auth/refreshToken", {
                method: "POST",
            });
            if (!res.ok) {
                return;
            }
            console.log(await res.json());
        } catch (error) {
            console.error("Error refreshing tokens", error);
        }
        startRefresh();
    };

    useEffect(() => {
        startRefresh();
        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [timeoutId, startRefresh]);
    return <div>{children}</div>;
};

export default Refresher;
