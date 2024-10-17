import { Product } from "@/app/(home)/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    product: Product;
    selectedConfig: {
        selectedPriceConfig: {
            [key: string]: string;
        };
        selectedToppings: string[];
    };
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
            const newItem = {
                product: action.payload.product,
                selectedConfig: action.payload.selectedConfig,
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
