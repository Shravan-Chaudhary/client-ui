"use client";
import React from "react";
import ToppingCard from "./topping-card";

const toppings = [
    { id: "1", name: "Cheese", image: "/cheese.png", price: 50, isAvailable: true },
    { id: "2", name: "Chicken", image: "/chicken.png", price: 50, isAvailable: true },
    { id: "3", name: " Mushroom", image: "/mushroom.png", price: 50, isAvailable: true },
    { id: "4", name: "Onion", image: "/onion.png", price: 50, isAvailable: true },
];

const ToppingsList = () => {
    const [selectedToppings, setSelectedToppings] = React.useState<string[]>([]);
    const handleToggle = (toppingId: string) => {
        setSelectedToppings((prev) =>
            prev.includes(toppingId) ? prev.filter((id) => id !== toppingId) : [...prev, toppingId]
        );
    };
    return (
        <section>
            <h3 className="text-lg font-semibold">Toppings</h3>
            <div className="mt-2 grid grid-cols-3 gap-4">
                {toppings.map((topping) => (
                    <ToppingCard
                        key={topping.id}
                        isSelected={selectedToppings.includes(topping.id)}
                        topping={topping}
                        onToggle={() => handleToggle(topping.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default ToppingsList;
