import { CouponData } from "@/types";
import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.epicfood.live",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

const ORDER_SERVICE_PREFIX = "/api/v1/order/api/v1/order";
export const getCustomer = async () => api.get(`${ORDER_SERVICE_PREFIX}/customers`);
export const addAddress = async (customerId: string, address: string) =>
    api.patch(`${ORDER_SERVICE_PREFIX}/customers/addresses/${customerId}`, {
        address,
    });
export const verifyCoupon = async (data: CouponData) => api.post(`${ORDER_SERVICE_PREFIX}/coupons/verify`, data);
