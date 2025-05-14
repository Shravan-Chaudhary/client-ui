import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as ICartItem } from "@/types";
import Image from "next/image";
import React from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { useTotal } from "@/lib/hooks/useTotal";
import { decrementCartItem, deleteCartItem, incrementCartItem } from "@/lib/store/features/cart/cartSlice";

interface Props {
    cartItem: ICartItem;
}
const MobileCartItem = ({ cartItem }: Props) => {
    const dispatch = useAppDispatch();

    const handleIncrement = () => {
        dispatch(incrementCartItem(cartItem));
    };

    const handleDecrement = () => {
        dispatch(decrementCartItem(cartItem));
    };

    const handleDelete = () => {
        dispatch(deleteCartItem(cartItem));
    };

    const totalItemPrice = useTotal(cartItem);

    return (
        // Image
        // Name and Config
        // Quantity
        // Price and Remove
        <div className="flex flex-col">
            {/* Upper Box */}
            <div className="flex justify-between">
                <div className="flex items-center justify-center">
                    <div className="mr-2">
                        <Image src={"/pizza.png"} alt="product-image" height={80} width={80} />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-sm font-medium md:text-base">{cartItem.name}</h4>
                        <p className="text-xs text-neutral-500 md:text-sm">
                            {Object.values(cartItem.selectedConfig.selectedPriceConfig)
                                .map((value) => value)
                                .join(", ")}
                        </p>
                        <p className="text-xs text-neutral-500 md:text-sm">
                            {Object.values(cartItem.selectedConfig.selectedToppings)
                                .map((value) => value.name)
                                .join(", ")}
                        </p>
                    </div>
                </div>

                {/* Price & Delete */}
                <div className="flex items-center justify-center gap-5 ">
                    <p className="text-base font-semibold md:text-lg">&#8377;{totalItemPrice * cartItem.qty}</p>
                </div>
            </div>
            {/* Lower Box*/}
            <div className="mt-1 flex w-full justify-between">
                {/* Quanity Pill */}
                <div className="flex items-center justify-between space-x-2 overflow-hidden rounded-full bg-primary p-[.2rem] px-1 sm:px-2 sm:py-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-full text-primary-foreground hover:bg-primary-foreground/20 focus-visible:bg-primary-foreground/20 focus-visible:ring-offset-primary"
                        aria-label="Decrease quantity"
                        onClick={handleDecrement}
                    >
                        <Minus className="size-4" />
                    </Button>
                    <p className="w-8 text-center text-sm font-semibold text-primary-foreground" aria-live="polite">
                        {cartItem.qty}
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-full text-primary-foreground hover:bg-primary-foreground/20 focus-visible:bg-primary-foreground/20 focus-visible:ring-offset-primary"
                        aria-label="Increase quantity"
                        onClick={handleIncrement}
                    >
                        <Plus className="size-4" />
                    </Button>
                </div>
                {/* Delete Button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="flex size-8 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary"
                    aria-label="Delete item"
                    onClick={handleDelete}
                >
                    <Trash2 className="size-5" />
                </Button>
            </div>
        </div>
    );
};

export default MobileCartItem;
