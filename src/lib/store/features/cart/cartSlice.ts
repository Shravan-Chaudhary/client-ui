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
            return {
                cartItems: [
                    ...state.cartItems,
                    {
                        product: action.payload.product,
                        selectedConfig: action.payload.selectedConfig,
                    },
                ],
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
