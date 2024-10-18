import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cart/cartSlice";
import CryptoJs from "crypto-js";
import { Bounce, toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const hashItem = (item: CartItem): string => {
    const jsonString = JSON.stringify({ ...item, qty: undefined });

    const hash = CryptoJs.SHA256(jsonString).toString();
    return hash;
};

export const addToCartToast = () => {
    toast.success("Added To Cart", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
};
