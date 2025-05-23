import React from "react";
import ToppingCard from "./topping-card";
import { Topping } from "../types";

const toppings = [
    { _id: "1", name: "Cheese", image: "/cheese.png", price: 50, isAvailable: true },
    { _id: "2", name: "Chicken", image: "/chicken.png", price: 50, isAvailable: true },
    { _id: "3", name: " Mushroom", image: "/mushroom.png", price: 50, isAvailable: true },
    { _id: "4", name: "Onion", image: "/onion.png", price: 50, isAvailable: true },
];

const ToppingsList = ({
    selectedToppings,
    handleToppingToggle,
}: {
    selectedToppings: Topping[];
    handleToppingToggle: (topping: Topping) => void;
}) => {
    return (
        <section>
            <h3 className="text-lg font-semibold">Toppings</h3>
            <div className="mt-2 grid grid-cols-3 gap-4">
                {toppings.map((topping) => (
                    <ToppingCard
                        key={topping._id}
                        isSelected={selectedToppings.includes(topping)}
                        topping={topping}
                        handleToggle={() => handleToppingToggle(topping)}
                    />
                ))}
            </div>
        </section>
    );
};

export default ToppingsList;
