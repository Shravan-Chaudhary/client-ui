"use client";
import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Restaurant } from "@/types";
import { useRouter } from "next/navigation";

type PropTypes = {
    restaurants: Restaurant[];
};

const TenantSelector: React.FC<PropTypes> = ({ restaurants }) => {
    const router = useRouter();
    const handleValueChange = (value: string) => {
        router.push(`?restaurantId=${value}`);
    };
    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="h-[30px] w-[140px]">
                <SelectValue placeholder="Select Outlet" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Locations</SelectLabel>
                    {restaurants.map((restaurant) => (
                        <SelectItem key={restaurant.id} value={String(restaurant.id)}>
                            {restaurant.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default TenantSelector;
