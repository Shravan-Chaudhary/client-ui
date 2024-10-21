"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const CheckoutButton = () => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <Button
            variant="default"
            size="sm"
            className="rounded-full bg-primary px-4 py-5 text-primary-foreground transition-all duration-300 ease-in-out hover:bg-primary/90"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            Checkout
            <ArrowRight
                className={`ml-2 size-4 transition-transform duration-300 ease-in-out ${
                    isHovered ? "translate-x-1" : ""
                }`}
            />
        </Button>
    );
};

export default CheckoutButton;
