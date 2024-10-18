import { Product, Topping } from "@/app/(home)/types";
import { hashItem } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Pick<Product, "_id" | "name" | "image" | "priceConfiguration"> {
    selectedConfig: {
        selectedPriceConfig: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    };
    qty: number;
    hash?: string;
}
export interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const hash = hashItem(action.payload);
            const newItem: CartItem = {
                ...action.payload,
                hash,
            };
            window.localStorage.setItem("cartItems", JSON.stringify([...state.cartItems, newItem]));
            return {
                cartItems: [...state.cartItems, newItem],
            };
        },

        setIntitialCart: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems.push(...action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart, setIntitialCart } = cartSlice.actions;

export default cartSlice.reducer;
