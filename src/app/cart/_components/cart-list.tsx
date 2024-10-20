import { Card } from "@/components/ui/card";
import React from "react";
import CartItem from "./cart-item";
import { Separator } from "@/components/ui/separator";

const CartList = () => {
    return (
        <Card className="w-full rounded-3xl border-none px-5 py-3 md:px-10 md:py-5">
            {/*   Cart Item  */}
            {/* Divider */}
            <CartItem />
            <Separator className="my-4" />
            {/* Price and Checkout */}
        </Card>
    );
};

export default CartList;
