"use client";
import React from "react";
import { buttonVariants } from "./ui/button";
import basket from "@/images/basket.png";
import Image from "next/image";
import Dot from "./dot";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CartIcon = () => {
    return (
        <Link href={"/cart"} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "relative mr-5")}>
            <Image src={basket} alt="basket" width={23} height={23} />
            <Dot />
        </Link>
    );
};

export default CartIcon;
