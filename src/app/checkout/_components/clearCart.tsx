"use client";

import { clearCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useEffect } from "react";

const ClearCart = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, []);
    return null;
};

export default ClearCart;
