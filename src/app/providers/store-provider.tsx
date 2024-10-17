"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store/store";
import { setIntitialCart } from "@/lib/store/features/cart/cartSlice";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();

        // Set initial cart state from localStorage if it exists
        const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;
        if (isLocalStorageAvailable) {
            const cartItems = window.localStorage.getItem("cartItems");

            if (cartItems) {
                try {
                    const parsedCartItems = JSON.parse(cartItems);
                    storeRef.current.dispatch(setIntitialCart(parsedCartItems));
                } catch (error) {
                    console.error("Error parsing cart items from localStorage", error);
                }
            }
        }
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
