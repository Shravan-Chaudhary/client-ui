import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2, CircleX, LayoutDashboard, Store } from "lucide-react";
import Link from "next/link";
import ClearCart from "../checkout/_components/clearCart";

const Payment = ({ searchParams }: { searchParams: { success: string; orderId: string; restaurantId: string } }) => {
    const isOrderSuccess = searchParams.success === "true";
    return (
        <>
            {isOrderSuccess && <ClearCart />}
            <div className="mt-32 flex w-full flex-col items-center gap-4">
                {isOrderSuccess ? (
                    <>
                        <CheckCircle2 size={80} className="text-green-500" />
                        <h1 className=" text-center text-2xl font-bold">Order placed successfully.</h1>
                        <p className="-mt-2 text-base font-semibold text-gray-800">Thank you for ordering.</p>
                    </>
                ) : (
                    <>
                        <CircleX size={80} className="text-red-500" />
                        <h1 className=" text-center text-2xl font-bold">Payment failed.</h1>
                        <p className="-mt-2 text-base font-semibold text-gray-800">Please try again.</p>
                    </>
                )}
                {isOrderSuccess && (
                    <Card className="mt-6">
                        <CardHeader className="p-4">
                            <CardTitle className="flex items-start justify-between gap-4 text-lg">
                                <div className="flex items-center gap-3">
                                    <Store className="text-primary" size={35} />
                                    <span>Your Order Information</span>
                                </div>
                                <Badge className="mt-1 px-4 text-base" variant={"secondary"}>
                                    Confirmed
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2">
                                <LayoutDashboard size={20} />
                                <h2 className="text-base font-medium">Order reference: </h2>
                                <Link href={`/order/${searchParams.orderId}`} className="underline">
                                    {searchParams.orderId}
                                </Link>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <LayoutDashboard size={20} />
                                <h2 className="text-base font-medium">Payment Status: </h2>
                                <span>Paid</span>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {isOrderSuccess ? (
                    <Button asChild className="mt-6">
                        <Link
                            href={`/order/${searchParams.orderId}?restaurantId=${searchParams.restaurantId}`}
                            className="flex gap-2"
                        >
                            <ArrowLeft size={20} className="text-white" />
                            <span>Go to order status page</span>
                        </Link>
                    </Button>
                ) : (
                    <Button asChild className="mt-6">
                        <Link href={`/checkout?restaurantId=${searchParams.restaurantId}`} className="flex gap-2">
                            <ArrowLeft size={20} className="text-white" />
                            <span>Go to checkout</span>
                        </Link>
                    </Button>
                )}
            </div>
        </>
    );
};

export default Payment;
