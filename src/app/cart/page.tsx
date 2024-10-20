import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import CartList from "./_components/cart-list";

const CartPage = () => {
    return (
        <MaxWidthWrapper className="mb-12 mt-10 max-w-[1024]">
            <h2 className="mb-2 ml-3 text-2xl font-semibold md:ml-4">Cart</h2>
            <CartList />
        </MaxWidthWrapper>
    );
};

export default CartPage;
