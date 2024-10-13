import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import menu from "@/images/menu.png";
import ProductCard from "./product-card";
import { Product } from "../types";
import { Category } from "../types";

const pizzas: Product[] = [
    {
        id: "1",
        name: "Margherita",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        image: "/pizza.png",
        price: 8.99,
    },
    {
        id: "2",
        name: "Pepperoni",
        description: "Pepperoni pizza with tomato sauce and mozzarella",
        image: "/pizza.png",
        price: 9.99,
    },
    {
        id: "3",
        name: "BBQ Chicken",
        description: "BBQ sauce, chicken, red onions, and cilantro",
        image: "/pizza.png",
        price: 10.99,
    },
    {
        id: "4",
        name: "Veggie",
        description: "Tomato sauce, mozzarella, bell peppers, olives, and onions",
        image: "/pizza.png",
        price: 9.49,
    },
];

type PropTypes = {
    categories: Category[];
};

const CatalogSection: React.FC<PropTypes> = ({ categories }) => {
    return (
        <section className="mt-[195px]">
            <div>
                <h1 className="mb-14 text-2xl font-bold md:text-4xl lg:text-5xl">
                    <span>Choose from Epic Catalogue</span>{" "}
                    <Image src={menu} alt="flame" className="inline-block size-8 sm:size-12" />
                </h1>
            </div>

            <div className="flex items-center justify-center">
                <Tabs defaultValue="pizza" className="">
                    <TabsList>
                        {categories.map((category) => (
                            <TabsTrigger key={category._id} value={category._id}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="pizza">
                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {pizzas.map((pizza) => {
                                return <ProductCard key={pizza.id} product={pizza} />;
                            })}
                        </div>
                    </TabsContent>
                    <TabsContent value="drinks">
                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {pizzas.map((pizza) => {
                                return <ProductCard key={pizza.id} product={pizza} />;
                            })}
                        </div>
                    </TabsContent>
                    <TabsContent value="snacks">
                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {pizzas.map((pizza) => {
                                return <ProductCard key={pizza.id} product={pizza} />;
                            })}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

export default CatalogSection;
