import { CouponData, OrderData } from "@/types";
import axios from "axios";
import { getAuthToken, refreshAuthToken } from "@/lib/cookies";

// Create axios instance
export const api = axios.create({
    baseURL: "https://api.epicfood.live",
    withCredentials: true, // This ensures cookies are sent with requests
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add request interceptor to include access token in requests
api.interceptors.request.use(async (config) => {
    try {
        // Get token from server-side API route
        const { token } = await getAuthToken();

        // Set auth header if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
});

// Add response interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const refreshed = await refreshAuthToken();

                if (refreshed) {
                    // Get new token after refresh
                    const { token } = await getAuthToken();

                    if (token) {
                        // Update auth header with new token
                        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                // Could handle redirect to login here
            }
        }

        return Promise.reject(error);
    }
);

const ORDER_SERVICE_PREFIX = "/api/v1/order/api/v1/order";
export const getCustomer = async () => api.get(`${ORDER_SERVICE_PREFIX}/customers`);
export const addAddress = async (customerId: string, address: string) =>
    api.patch(`${ORDER_SERVICE_PREFIX}/customers/addresses/${customerId}`, {
        address,
    });
export const verifyCoupon = async (data: CouponData) => api.post(`${ORDER_SERVICE_PREFIX}/coupons/verify`, data);

export const createOrder = (data: OrderData, idempotencyKey: string) =>
    api.post(`${ORDER_SERVICE_PREFIX}/orders`, data, {
        headers: {
            "idempotency-key": idempotencyKey,
            "Idempotency-Key": idempotencyKey,
        },
    });

export const getSingleOrder = async (orderId: string) => {
    return api.get(`${ORDER_SERVICE_PREFIX}/orders/${orderId}`);
};
