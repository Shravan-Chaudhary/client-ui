"use client";
import React from "react";
import { buttonVariants } from "./ui/button";
import basket from "@/images/basket.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const DotWithoutSSR = dynamic(() => import("./dot"), { ssr: false });

const CartIcon = () => {
    const searchParmas = useSearchParams().get("restaurantId");
    let params = `restaurantId=${searchParmas}`;
    if (!searchParmas) {
        params = "";
    }
    return (
        <Link
            href={`/cart?${params}`}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "relative mr-5")}
        >
            <Image src={basket} alt="basket" width={23} height={23} />
            <DotWithoutSSR />
        </Link>
    );
};

export default CartIcon;
