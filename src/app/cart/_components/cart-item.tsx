import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartItem = () => {
    return (
        // Image
        // Name and Config
        // Quantity
        // Price and Remove
        <div className="flex items-center justify-between">
            <div className="mr-2">
                <Image src={"/pizza.png"} alt="product-image" height={80} width={80} />
            </div>
            {/* Name, Config */}
            <div className="flex flex-col">
                <h4 className="text-sm md:text-base md:font-medium">Mushroom Pizza</h4>
                <p className="text-xs text-neutral-500 md:text-sm">Small, Thin</p>
                <p className="text-xs text-neutral-500 md:text-sm">Cheese</p>
            </div>

            {/* Quantity & Increment, Decrement */}
            <div className="mx-auto flex max-w-fit items-center justify-between space-x-2 overflow-hidden rounded-full bg-primary px-2 py-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full text-primary-foreground hover:bg-primary-foreground/20 focus-visible:bg-primary-foreground/20 focus-visible:ring-offset-primary"
                    aria-label="Decrease quantity"
                >
                    <Minus className="size-4" />
                </Button>
                <p className="w-8 text-center text-sm font-semibold text-primary-foreground" aria-live="polite">
                    2
                </p>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full text-primary-foreground hover:bg-primary-foreground/20 focus-visible:bg-primary-foreground/20 focus-visible:ring-offset-primary"
                    aria-label="Increase quantity"
                >
                    <Plus className="size-4" />
                </Button>
            </div>

            {/* Price & Delete */}
            <div className="flex items-center justify-center gap-5">
                <p className="text-base font-medium md:text-lg md:font-semibold">&#8377;800</p>
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary"
                    aria-label="Delete item"
                >
                    <Trash2 className="size-5" />
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
