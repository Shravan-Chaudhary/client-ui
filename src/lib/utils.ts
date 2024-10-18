import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cart/cartSlice";
import CryptoJs from "crypto-js";
import { Bounce, toast } from "react-toastify";
import { Product } from "@/app/(home)/types";
import { PriceType } from "@/constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const hashItem = (item: CartItem): string => {
    const jsonString = JSON.stringify({ ...item, qty: undefined });

    const hash = CryptoJs.SHA256(jsonString).toString();
    return hash;
};

export const getMininumPrice = (product: Product): number => {
    const baseType = Object.entries(product.priceConfiguration).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([key, value]) => value.priceType === PriceType.BASE
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const basePrice = baseType.reduce((acc, [key, value]) => {
        return acc + Math.min(...Object.values(value.availableOptions));
    }, 0);
    return basePrice;
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
