"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React, { startTransition, Suspense } from "react";
import { Product, Topping } from "../types";
import ToppingsList from "./toppings-list";
import { ShoppingCart } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart, CartItem } from "@/lib/store/features/cart/cartSlice";
import { hashItem } from "@/lib/utils";

type PropTypes = { product: Product };
type SelectedPriceConfig = {
    [key: string]: string;
};
const ProductModal = ({ product }: PropTypes) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.cartItems);
    const defaultPriceConfig: SelectedPriceConfig = Object.entries(product.category.priceConfiguration).reduce(
        (acc, [key, value]) => {
            acc[key] = value.availableOptions[0];
            return acc;
        },
        {} as SelectedPriceConfig
    );
    const [selectedPriceConfig, setSelectedPriceConfig] = React.useState<SelectedPriceConfig>(defaultPriceConfig);
    const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);

    const totalPrice = React.useMemo(() => {
        const toppingsTotal = selectedToppings.reduce((acc, topping) => acc + topping.price, 0);
        const priceConfigTotal = Object.entries(selectedPriceConfig).reduce((acc, [key, value]: [string, string]) => {
            const price = product.priceConfiguration[key].availableOptions[value];
            return acc + price;
        }, 0);
        return toppingsTotal + priceConfigTotal;
    }, [selectedPriceConfig, selectedToppings, product]);

    const itemAlreadyInCart: boolean = React.useMemo(() => {
        const currentItemConfig = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            selectedConfig: {
                selectedPriceConfig: { ...selectedPriceConfig },
                selectedToppings,
            },
            qty: 1,
        };

        const hash = hashItem(currentItemConfig);
        const found = cartItems.some((item) => item.hash === hash);
        return found;
    }, [selectedPriceConfig, selectedToppings, product, cartItems]);

    const handleToppingToggle = (topping: Topping) => {
        setSelectedToppings((prev) =>
            prev.includes(topping) ? prev.filter((id) => id !== topping) : [...prev, topping]
        );
    };
    const handleConfigChange = (key: string, value: string) => {
        startTransition(() => {
            setSelectedPriceConfig((prev) => {
                const newConfig = { ...prev, [key]: value };
                return newConfig;
            });
        });
    };

    const handleAddToCart = () => {
        const cartItem: CartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            selectedConfig: {
                selectedPriceConfig: selectedPriceConfig!,
                selectedToppings,
            },
            qty: 1,
        };
        dispatch(addToCart(cartItem));
    };

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
                                <RadioGroup
                                    onValueChange={(value: string) => handleConfigChange(key, value)}
                                    defaultValue={value.availableOptions[0]}
                                    className="grid grid-cols-3 gap-4"
                                >
                                    {value.availableOptions.map((option) => {
                                        return (
                                            <div className="max-w-40 rounded-2xl bg-white" key={option}>
                                                <RadioGroupItem
                                                    value={option}
                                                    id={option}
                                                    className="peer sr-only"
                                                    aria-label={option}
                                                />
                                                <Label
                                                    htmlFor={option}
                                                    className="sm: flex max-w-40 flex-col items-center justify-between rounded-xl border-2 bg-transparent p-2 py-3 hover:text-accent-foreground peer-data-[state=checked]:border-primary sm:rounded-2xl sm:p-4 [&:has([data-state=checked])]:border-primary"
                                                >
                                                    {option}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </RadioGroup>
                            </div>
                        ))}
                        {/*TODO: Fetch Toppings (dynamic)*/}
                        {/*TODO: Add Toppings to cart state*/}
                        <div className="mt-4 flex flex-col gap-1 sm:mt-6 sm:gap-2">
                            {/* todo: Make this check dynamic */}
                            {product.category.name === "Pizza" && (
                                <Suspense fallback={"Loading Toppings.."}>
                                    <ToppingsList
                                        selectedToppings={selectedToppings}
                                        handleToppingToggle={handleToppingToggle}
                                    />
                                </Suspense>
                            )}
                        </div>
                        <div className="mt-4 flex items-center justify-between sm:mt-6">
                            <span className="text-lg font-bold">&#8377;{totalPrice}</span>
                            <Button
                                onClick={handleAddToCart}
                                size="sm"
                                className="flex items-center justify-center gap-2 rounded-full p-5"
                                disabled={itemAlreadyInCart}
                            >
                                <ShoppingCart className="size-5" />

                                {itemAlreadyInCart ? <span>Already in Cart</span> : <span>Add to Cart </span>}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
