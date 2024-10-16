import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { Product } from "../types";
import OptionSelector from "@/components/option-selector";
import ToppingsList from "./toppings-list";
import { ShoppingCart } from "lucide-react";

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
            <DialogContent className="max-w-3xl rounded-3xl p-0">
                <div className="flex">
                    {/* left */}
                    <div className="hidden w-1/3 items-center justify-center rounded-l-3xl bg-white p-2 sm:flex">
                        <Image alt="image" src={product.image} height={250} width={250} />
                    </div>
                    {/* right */}
                    <div className="w-full px-6 py-4 lg:w-2/3">
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        {/*TODO: Zinc shade to description text */}
                        <p className="mt-1">{product.description}</p>
                        {/* Radio Group */}
                        {Object.entries(product.category.priceConfiguration).map(([key, value]) => (
                            <div key={key} className="mt-4 flex flex-col gap-1 sm:mt-6 sm:gap-2">
                                <h3 className="text-lg font-semibold">{key}</h3>
                                <OptionSelector
                                    options={value.availableOptions}
                                    defaultValue={value.availableOptions[0]}
                                />
                            </div>
                        ))}
                        {/*TODO: Fetch Toppings (dynamic)*/}
                        <div className="mt-4 flex flex-col gap-1 sm:mt-6 sm:gap-2">
                            <ToppingsList />
                        </div>
                        <div className="mt-4 flex items-center justify-between sm:mt-6">
                            <span className="text-lg font-bold">$100</span>
                            <Button size="sm" className="flex items-center justify-center gap-2 rounded-full p-5">
                                <ShoppingCart className="size-5" />
                                <span>Add to Cart </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
