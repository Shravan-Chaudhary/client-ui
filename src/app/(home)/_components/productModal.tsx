import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import pizzaImage from "@/images/pizza.png";
import { Product } from "../types";

type PropTypes = { product: Product };

const ProductModal = ({ product }: PropTypes) => {
    return (
        <Dialog>
            <DialogTrigger
                className={buttonVariants({
                    size: "sm",
                    className:
                        "px-5 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150",
                })}
            >
                Choose
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 ">
                <div className="flex">
                    {/* left */}
                    <div className="flex w-1/3 items-center justify-center rounded-l-3xl bg-white p-2">
                        <Image alt="image" src={pizzaImage} height={250} width={250} />
                    </div>
                    {/* right */}
                    <div className="w-2/3 px-6 py-4">
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        {/* Zinc shade to description text */}
                        {/* Add eslint-plugin-tailwindcss package*/}
                        <p className="mt-1">{product.description}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
