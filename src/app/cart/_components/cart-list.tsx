"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useMemo, useState } from "react";
import CartItem from "./cart-item";
import { Separator } from "@/components/ui/separator";
import MobileCartItem from "./mobile-cart-item";
import CheckoutButton from "./checkout-button";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotal } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";

const CartList = () => {
    const searchParmas = useSearchParams().get("restaurantId");
    let params = `restaurantId=${searchParmas}`;
    if (!searchParmas) {
        params = "";
    }
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const cart = useAppSelector((state) => state.cart.cartItems);

    const grandTotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            return getItemTotal(item) * item.qty + acc;
        }, 0);
    }, [cart]);

    if (!isClient) {
        return null;
    }

    if (!cart.length) {
        return <div className="">You cart is empty</div>;
    }

    return (
        <Card className="w-full rounded-3xl border-none px-5 py-3 md:px-10 md:py-5">
            {/*   Cart Item  */}
            {/* Divider */}
            {cart.map((item) => (
                <div key={item.hash}>
                    <CartItem key={item.hash} cartItem={item} />
                    <Separator className="my-4" />
                </div>
            ))}
            <MobileCartItem />
            <Separator className="my-4" />
            {/* Price and Checkout */}
            <div className="mt-6 flex items-center justify-between">
                <p className="text-base font-semibold md:text-lg">&#8377;{grandTotal}</p>
                <Link href={`/checkout?${params}`}>
                    <CheckoutButton />
                </Link>
            </div>
        </Card>
    );
};

export default CartList;
