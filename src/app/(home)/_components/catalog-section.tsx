import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import menu from "@/images/menu.png";
import ProductCard from "./product-card";
import { Product, Category } from "../types";

type PropTypes = {
    categories: Category[];
    products: Product[];
};

const CatalogSection: React.FC<PropTypes> = ({ categories, products }) => {
    return (
        <section className="mt-[195px]">
            <div>
                <h1 className="mb-14 text-2xl font-bold md:text-4xl lg:text-5xl">
                    <span>Choose from Epic Catalogue</span>{" "}
                    <Image src={menu} alt="flame" className="inline-block size-8 sm:size-12" />
                </h1>
            </div>

            <div className="flex items-center justify-center">
                <Tabs defaultValue={categories[0]._id} className="">
                    <TabsList>
                        {categories.map((category) => (
                            <TabsTrigger key={category._id} value={category._id}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categories.map((category) => (
                        <TabsContent key={category._id} value={category._id}>
                            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {products.map((product) => {
                                    return <ProductCard key={product._id} product={product} />;
                                })}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
};

export default CatalogSection;
