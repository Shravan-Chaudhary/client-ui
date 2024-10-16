"use client";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import basket from "@/images/basket.png";
import Image from "next/image";
import Dot from "./dot";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAppDispatch } from "@/lib/store/hooks";
import { increment } from "@/lib/store/features/cart/cartSlice";

const CartIcon = () => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(increment());
    };
    return (
        <Link href={"/cart"} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "relative mr-5")}>
            <Image src={basket} alt="basket" width={23} height={23} />
            <Dot />
            <Button size={"sm"} onClick={handleClick}>
                Increment
            </Button>
        </Link>
    );
};

export default CartIcon;
