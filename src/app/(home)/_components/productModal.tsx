import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import pizzaImage from "@/images/pizza.png";
import { Product } from "../types";
import OptionSelector from "@/components/option-selector";
import { CustomizationOption } from "@/types";

type PropTypes = { product: Product };
const pizzaSizes: CustomizationOption[] = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
];
const crustTypes: CustomizationOption[] = [
    { value: "thin", label: "Thin", image: "/api/placeholder/100/100" },
    { value: "thick", label: "Thick", image: "/api/placeholder/100/100" },
];

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
                        {/*TODO: Zinc shade to description text */}
                        <p className="mt-1">{product.description}</p>
                        {/* Radio Group */}
                        <div className="mt-6 flex flex-col gap-2">
                            <h3 className="text-lg font-semibold">Choose Size</h3>
                            <OptionSelector options={pizzaSizes} defaultValue="small" />
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            <h3 className="text-lg font-semibold">Choose Crust</h3>
                            <OptionSelector options={crustTypes} defaultValue="thin" />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
