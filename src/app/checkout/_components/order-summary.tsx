import React, { useMemo, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/store/hooks";
import { getItemTotal } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { verifyCoupon } from "@/lib/http/api";
import { useSearchParams } from "next/navigation";
import { CouponData } from "@/types";
import { LoaderCircle } from "lucide-react";

const OrderSummary = ({
    isPlaceOrderPending,
    handleCouponCodeChange,
}: {
    isPlaceOrderPending: boolean;
    handleCouponCodeChange: (code: string) => void;
}) => {
    const searchParams = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [discountError, setDiscountError] = useState("");
    const couponCodeRef = useRef<HTMLInputElement>(null);
    const cart = useAppSelector((state) => state.cart.cartItems);

    const TAXES_PERCENTAGE = 8;
    const DELIVERY_AMOUNT = 60;

    const subTotal = useMemo(() => {
        return cart.reduce((acc, curr) => {
            return acc + curr.qty * getItemTotal(curr);
        }, 0);
    }, [cart]);

    const discountAmount = useMemo(() => {
        return (subTotal * discountPercentage) / 100;
    }, [subTotal, discountPercentage]);

    const taxesAmount = useMemo(() => {
        const amountAfterDiscount = subTotal - discountAmount;
        return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
    }, [subTotal, discountAmount]);

    const orderTotalWithDiscount = React.useMemo(() => {
        return subTotal + taxesAmount + DELIVERY_AMOUNT - discountAmount;
    }, [subTotal, discountAmount, taxesAmount]);

    const orderTotalWithoutDiscount = React.useMemo(() => {
        return subTotal + taxesAmount + DELIVERY_AMOUNT;
    }, [subTotal, taxesAmount]);

    const { mutate, isPending } = useMutation({
        mutationKey: ["couponCode"],
        mutationFn: async () => {
            const restaurantId = searchParams.get("restaurantId");
            if (!couponCodeRef.current) return;
            if (!restaurantId) return;
            const couponData: CouponData = {
                code: couponCodeRef.current.value,
                tenantId: restaurantId,
            };
            return await verifyCoupon(couponData).then((res) => res.data);
        },
        onSuccess: (data) => {
            console.log("response-data", data);

            if (data.data.valid) {
                setDiscountError("");
                handleCouponCodeChange(couponCodeRef.current ? couponCodeRef.current.value : "");
                setDiscountPercentage(data.data.discount);
                return;
            }
            setDiscountError(data.message);
            handleCouponCodeChange("");
            setDiscountPercentage(0);
        },

        onError: (error) => {
            console.log("error", error);
            setDiscountError("Erorr while applying coupon");
        },
    });

    const handleCouponValidation = (e: React.MouseEvent) => {
        e.preventDefault();
        const tenantId = searchParams.get("restaurantId");
        if (!tenantId) {
            alert("Restaurant Id is required");
            return;
        }
        mutate();
    };

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
                        <span className="flex flex-col font-bold">
                            <span className={discountPercentage ? "text-gray-500 line-through" : ""}>
                                &#8377;{orderTotalWithoutDiscount}
                            </span>
                            {discountPercentage ? (
                                <span className="text-green-500">&#8377;{orderTotalWithDiscount}</span>
                            ) : null}
                        </span>
                    </div>
                    <div className="grid grid-cols-11 gap-5">
                        <div className="col-span-8">
                            <Input
                                id="coupon"
                                name="coupon"
                                // required
                                type="text"
                                placeholder="Coupon Code"
                                ref={couponCodeRef}
                            />

                            {discountError && <span className="text-xs text-red-500 ">{discountError}</span>}
                        </div>
                        <Button
                            variant={"secondary"}
                            className="col-span-3"
                            onClick={handleCouponValidation}
                            disabled={isPending}
                        >
                            Apply
                        </Button>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button disabled={isPlaceOrderPending}>
                            {isPlaceOrderPending ? (
                                <span className="flex items-center gap-2">
                                    <LoaderCircle className="animate-spin">
                                        <span>Placing Order...</span>
                                    </LoaderCircle>
                                </span>
                            ) : (
                                <span>Place Order</span>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;
