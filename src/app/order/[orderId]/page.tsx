import MaxWidthWrapper from "@/components/max-width-wrapper";
import OrderStatus from "@/app/order/_components/order-status";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { AUTH_TOKENS } from "@/lib/cookies";

async function getOrder(orderId: string) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(AUTH_TOKENS.ACCESS_TOKEN)?.value;

    if (!accessToken) {
        throw new Error("No access token found");
    }

    const response = await fetch(`https://api.epicfood.live/api/v1/order/api/v1/order/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store", // Equivalent to fetching fresh data each time
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch order: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.data) {
        return data.data;
    } else {
        throw new Error("Invalid response format");
    }
}

export default async function SingleOrder({ params }: { params: { orderId: string } }) {
    // Get the orderId from the route params
    const { orderId } = params;

    try {
        // Fetch the order data
        const order = await getOrder(orderId);

        return (
            <MaxWidthWrapper className="mb-8 mt-12 flex flex-col sm:mt-20">
                <Card>
                    <CardHeader>
                        <CardTitle>Order</CardTitle>
                        <CardDescription>Track your order status</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <OrderStatus orderId={order._id} />
                    </CardContent>
                </Card>
                <div className="mt-8 flex gap-6">
                    <Card className="w-1/3">
                        <CardHeader className="p-4">
                            <CardTitle className="flex items-start justify-between gap-12 text-lg">
                                Delivery Address
                            </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-6">
                            <h2 className="font-bold">
                                {order.customerId.firstName + " " + order.customerId.lastName}
                            </h2>
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
                </div>
            </MaxWidthWrapper>
        );
    } catch (error) {
        console.error("Error fetching order:", error);
        return (
            <MaxWidthWrapper className="mb-8 mt-12 flex flex-col items-center justify-center text-center sm:mt-20">
                <h1 className="text-3xl font-bold">Error</h1>
                <p className="mt-4 text-gray-500">
                    {error instanceof Error ? error.message : "Failed to load order details"}
                </p>
            </MaxWidthWrapper>
        );
    }
}
