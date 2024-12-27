import axios from "axios";

export const api = axios.create({
    // TODO: Change this to env var (api gateway)
    baseURL: "http://localhost:5503",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

const ORDER_SERVICE_PREFIX = "/api/v1/order";
export const getCustomer = async () => api.get(`${ORDER_SERVICE_PREFIX}/customers`);
