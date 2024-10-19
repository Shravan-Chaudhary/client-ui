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

type PropTypes = {
    restaurants: Restaurant[];
};

const DropdownSelect: React.FC<PropTypes> = ({ restaurants }) => {
    return (
        <Select>
            <SelectTrigger className="h-[30px] w-[140px]">
                <SelectValue placeholder="Select Outlet" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Locations</SelectLabel>
                    {restaurants.map((restaurant) => (
                        <SelectItem key={restaurant.id} value={restaurant.name.toLowerCase()}>
                            {restaurant.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default DropdownSelect;
