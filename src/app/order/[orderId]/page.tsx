import MaxWidthWrapper from "@/components/max-width-wrapper";
import OrderStatus from "@/app/order/_components/order-status";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
// import { Separator } from "@/components/ui/separator";
// import { Banknote, Coins, LayoutDashboard } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Order } from "@/types";
// import { cookies } from "next/headers";

const SingleOrder = async () => {
    // const response = await fetch(
    //     `${process.env.BACKEND_URL}/api/order/orders/${params.orderId}?fields=address,paymentStatus,paymentMode`,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
    //         },
    //     }
    // );

    // if (!response.ok) {
    //     console.log(response);
    //     throw new Error("Failed to fetch single order");
    // }
    // const order: Order = await response.json();
    return (
        <MaxWidthWrapper className="mb-8 mt-12 flex flex-col sm:mt-20">
            <Card>
                <CardHeader>
                    <CardTitle>Order</CardTitle>
                    <CardDescription>Track your order status</CardDescription>
                </CardHeader>

                <CardContent>
                    <OrderStatus />
                </CardContent>
            </Card>
            {/* <div className="flex gap-6">
                <Card className="w-1/3">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-start justify-between gap-12 text-lg">
                            Delivery Address
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <h2 className="font-bold">{order.customerId.firstName + " " + order.customerId.lastName}</h2>
                        <p className="mt-2">{order.address}</p>
                    </CardContent>
                </Card>

                <Card className="w-2/3">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-start justify-between gap-12 text-lg">
                            Your order information
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                            <LayoutDashboard size={20} />
                            <h2 className="text-base font-medium">Order reference: </h2>
                            {order._id}
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                            <Banknote />
                            <h2 className="text-base font-medium">Payment status: </h2>
                            <span>{order.paymentStatus.toUpperCase()}</span>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                            <Coins size={20} />
                            <h2 className="text-base font-medium">Payment method: </h2>
                            <span>{order.paymentMode.toUpperCase()}</span>
                        </div>

                        <Button variant={"destructive"} className="mt-6">
                            Cancel Order
                        </Button>
                    </CardContent>
                </Card>
            </div> */}
        </MaxWidthWrapper>
    );
};

export default SingleOrder;
