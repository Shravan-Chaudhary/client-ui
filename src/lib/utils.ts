/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cart/cartSlice";
import CryptoJs from "crypto-js";
import { Bounce, toast } from "react-toastify";
import { Product, Topping } from "@/app/(home)/types";
import { PriceType } from "@/constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const hashItem = (item: CartItem): string => {
    const orderedItem = {
        id: item._id,
        name: item.name,
        priceConfiguration: item.priceConfiguration,
        selectedConfig: {
            selectedPriceConfig: sortObject(item.selectedConfig.selectedPriceConfig),
            selectedToppings: sortToppings(item.selectedConfig.selectedToppings),
        },
    };

    const jsonString = JSON.stringify(orderedItem);
    const hash = CryptoJs.SHA256(jsonString).toString();
    return hash;
};

const sortObject = (obj: Record<string, any>): Record<string, any> => {
    return Object.keys(obj)
        .sort()
        .reduce(
            (result, key) => {
                result[key] = obj[key];
                return result;
            },
            {} as Record<string, any>
        );
};

const sortToppings = (toppings: Topping[]): Topping[] => {
    return toppings.sort((a, b) => {
        if (a._id !== b._id) return a._id.localeCompare(b._id);
        if (a.name !== b.name) return a.name.localeCompare(b.name);
        if (a.price !== b.price) return a.price - b.price;
        return 0;
    });
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

export const getItemTotal = (product: CartItem) => {
    const toppingsTotal = product.selectedConfig.selectedToppings.reduce((acc, topping) => acc + topping.price, 0);
    const priceConfigTotal = Object.entries(product.selectedConfig.selectedPriceConfig).reduce(
        (acc, [key, value]: [string, string]) => {
            const price = product.priceConfiguration[key].availableOptions[value];
            return acc + price;
        },
        0
    );
    return toppingsTotal + priceConfigTotal;
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

export const successToast = (message: string) => {
    toast.success(message, {
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

export const errorToast = (message: string) => {
    toast.error(message, {
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
