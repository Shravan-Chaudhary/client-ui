import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

const Dot = () => {
    const value = useAppSelector((state) => state.cart.value);
    return (
        <span className="absolute -right-1 -top-0 flex size-[4px] items-center justify-center rounded-full bg-primary p-[9px] font-bold text-white">
            {value}
        </span>
    );
};

export default Dot;
