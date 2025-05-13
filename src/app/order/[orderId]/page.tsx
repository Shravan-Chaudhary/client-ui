"use client"; // Convert to client component

import MaxWidthWrapper from "@/components/max-width-wrapper";
import OrderStatus from "@/app/order/_components/order-status";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import { useParams } from "next/navigation";

const SingleOrder = () => {
    const params = useParams();
    const orderId = params.orderId as string;

    // State for order data and loading/error states
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch order data on component mount
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // Get access token from cookies
                // const accessToken = document.cookie
                //     .split("; ")
                //     .find((row) => row.startsWith("accessToken="))
                //     ?.split("=")[1];

                // Get access token from localStorage
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) {
                    throw new Error("No access token found");
                }

                const response = await fetch(`https://api.epicfood.live/api/v1/order/api/v1/order/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch order: ${response.status}`);
                }

                const data = await response.json();

                if (data.success && data.data) {
                    setOrder(data.data);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                console.error("Error fetching order:", err);
                setError(err instanceof Error ? err.message : "Failed to load order");
            } finally {
                setIsLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    // Show loading state
    if (isLoading) {
        return (
            <MaxWidthWrapper className="mb-8 mt-12 flex flex-col items-center justify-center sm:mt-20">
                <p>Loading order details...</p>
            </MaxWidthWrapper>
        );
    }

    // Show error state
    if (error || !order) {
        return (
            <MaxWidthWrapper className="mb-8 mt-12 flex flex-col items-center justify-center text-center sm:mt-20">
                <h1 className="text-3xl font-bold">Error</h1>
                <p className="mt-4 text-gray-500">{error || "Failed to load order details"}</p>
            </MaxWidthWrapper>
        );
    }

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
            </div>
        </MaxWidthWrapper>
    );
};

export default SingleOrder;
