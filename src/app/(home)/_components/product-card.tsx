import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import ProductModal from "./product-modal";
import { Product } from "../types";
import { getMininumPrice } from "@/lib/utils";

type PropTypes = { product: Product };

const ProductCard: React.FC<PropTypes> = ({ product }) => {
    return (
        <Card className="flex w-[350] flex-col justify-between rounded-3xl border-none md:w-[400]">
            <CardHeader className="flex items-center justify-center">
                <Image alt="pizza-image" width={150} height={150} src={product.image} />
            </CardHeader>
            <CardContent>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="mt-2">{product.description}</p>
            </CardContent>
            <CardFooter className="mt-2 flex justify-between">
                <p>
                    <span>From </span>
                    <span className="font-bold">&#8377;{getMininumPrice(product)}</span>
                </p>
                <ProductModal product={product} />
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
