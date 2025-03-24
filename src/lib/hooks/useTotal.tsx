import { useMemo } from "react";
import { getItemTotal } from "../utils";
import { CartItem } from "@/types";

export function useTotal(product: CartItem) {
    const totalPrice = useMemo(() => {
        return getItemTotal(product);
    }, [product]);

    return totalPrice;
}
