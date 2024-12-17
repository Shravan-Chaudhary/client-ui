"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import CartItem from "./cart-item";
import { Separator } from "@/components/ui/separator";
import MobileCartItem from "./mobile-cart-item";
import CheckoutButton from "./checkout-button";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
// import { useSearchParams } from "next/navigation";

const CartList = () => {
    // const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const cart = useAppSelector((state) => state.cart.cartItems);
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
                <>
                    <CartItem key={item.hash} cartItem={item} />
                    <Separator className="my-4" />
                </>
            ))}
            <MobileCartItem />
            <Separator className="my-4" />
            {/* Price and Checkout */}
            <div className="mt-6 flex items-center justify-between">
                <p className="text-base font-semibold md:text-lg">&#8377;2000</p>
                <Link href={"/checkout"}>
                    <CheckoutButton />
                </Link>
            </div>
        </Card>
    );
};

export default CartList;
