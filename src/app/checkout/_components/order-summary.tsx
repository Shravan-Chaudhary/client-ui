import React, { useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotal } from "@/lib/utils";

const OrderSummary = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const cart = useAppSelector((state) => state.cart.cartItems);

    const TAXES_PERCENTAGE = 8;
    const DELIVERY_AMOUNT = 60;

    const subTotal = useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr);
        }, 0);
    }, [cart]);

    const discountAmount = useMemo(() => {
        return Math.round((subTotal * discountPercentage) / 100);
    }, [subTotal, discountPercentage]);

    const taxesAmount = useMemo(() => {
        const amountAfterDiscount = subTotal - discountAmount;
        return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
    }, [subTotal, discountAmount]);

    const orderTotal = React.useMemo(() => {
        return subTotal + taxesAmount + DELIVERY_AMOUNT - discountAmount;
    }, [subTotal, discountAmount, taxesAmount]);

    return (
        <Card className="flex w-full flex-col justify-between rounded-3xl border-none">
            <CardContent className="mt-5">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <p>Subtotal</p>
                        <span className="font-bold">&#8377;{subTotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>
                            <span>Taxes</span>
                            <span className="ml-1 text-xs">(After Discount)</span>
                        </p>
                        <span className="font-bold">&#8377;{taxesAmount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Delivery Charges</p>
                        <span className="font-bold">&#8377;60</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Discount</p>
                        <span className="font-bold">&#8377;{discountAmount}</span>
                    </div>
                </div>
                <Separator className="my-5" />

                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h4 className="font-bold">Order Total</h4>
                        <span className="font-bold">&#8377;{orderTotal}</span>
                    </div>
                    <div className="grid grid-cols-11 gap-5">
                        <Input
                            id="coupon"
                            name="coupon"
                            // required
                            type="text"
                            className="col-span-8"
                            placeholder="Coupon Code"
                        />
                        <Button variant={"secondary"} className="col-span-3">
                            Apply
                        </Button>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button>Place Order</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;
