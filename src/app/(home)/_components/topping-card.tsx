import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Topping } from "../types";
import { CircleCheck } from "lucide-react";

type PropTypes = { topping: Topping; isSelected: boolean; handleToggle: () => void };

const ToppingCard: React.FC<PropTypes> = ({ topping, isSelected, handleToggle }) => {
    return (
        <Button
            variant={"outline"}
            className={cn(
                "relative flex h-full max-w-40 flex-col gap-1 rounded-2xl p-0 pb-1 lg:gap-2",
                isSelected && "border-primary"
            )}
            onClick={handleToggle}
        >
            <Image alt={topping.name} src={topping.image} height={80} width={80} />
            <h4>{topping.name}</h4>
            <p>&#8377;{topping.price}</p>
            <CircleCheck
                className={cn(
                    "absolute right-1 top-1 sm:right-2 sm:top-2 size-5 text-primary hidden",
                    isSelected && "inline-flex"
                )}
            />
        </Button>
    );
};

export default ToppingCard;
