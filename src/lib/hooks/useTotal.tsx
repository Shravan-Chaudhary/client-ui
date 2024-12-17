import { useMemo } from "react";
import { CartItem } from "../store/features/cart/cartSlice";

export function useTotal(product: CartItem) {
    const totalPrice = useMemo(() => {
        const toppingsTotal = product.selectedConfig.selectedToppings.reduce((acc, topping) => acc + topping.price, 0);
        const priceConfigTotal = Object.entries(product.selectedConfig.selectedPriceConfig).reduce(
            (acc, [key, value]: [string, string]) => {
                const price = product.priceConfiguration[key].availableOptions[value];
                return acc + price;
            },
            0
        );
        return toppingsTotal + priceConfigTotal;
    }, [product]);

    return totalPrice;
}
