import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ProductCard from "./product-card";
import { Category, Product } from "../types";
import { ONE_HOUR_IN_SEC } from "@/constants";

interface PropTypes {
    searchParams: {
        restaurantId: string;
    };
}

const ProductList: React.FC<PropTypes> = async ({ searchParams }) => {
    const categoryResponse = await fetch("https:api.epicfood.live/api/v1/inventory/api/v1/inventory/categories", {
        next: {
            revalidate: ONE_HOUR_IN_SEC,
        },
    });

    if (!categoryResponse.ok) {
        throw new Error("Failed to fetch categories");
    }

    const categories: Category[] = await categoryResponse.json().then((response) => response.data);

    //TODO: Pagination
    //TODO: Promise.all for fetching different categories products (OR)
    //TODO: fetch all products and filter them (Promise.all can be used to fetch products and categories in this case)
    const productsResponse = await fetch(
        `https://api.epicfood.live/api/v1/inventory/api/v1/inventory/products?tenantId=${searchParams.restaurantId}`,
        {
            next: {
                revalidate: ONE_HOUR_IN_SEC,
            },
        }
    );

    if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
    }

    const products: Product[] = await productsResponse.json().then((response) => response.data.docs);

    return (
        <Tabs defaultValue={categories[0]._id} className="">
            <TabsList>
                {categories.map((category) => (
                    <TabsTrigger key={category._id} value={category._id}>
                        {category.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            {searchParams.restaurantId ? (
                categories.map((category) => (
                    <TabsContent key={category._id} value={category._id}>
                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {products.map((product) => {
                                return <ProductCard key={product._id} product={product} />;
                            })}
                        </div>
                    </TabsContent>
                ))
            ) : (
                <span className="mt-6 block text-lg font-semibold text-neutral-800">
                    Select a city for products to show
                </span>
            )}
        </Tabs>
    );
};

export default ProductList;
