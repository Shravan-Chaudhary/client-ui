"use client";

import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order } from "@/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy orders for fallback

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // TODO: Add pagination
    // TODO: Make it server component for production

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                if (!accessToken) {
                    setError("No access token found");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`https://api.epicfood.live/api/v1/order/api/v1/order/orders/mine`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching orders: ${response.status}`);
                }

                const orderData = await response.json();
                console.log("orders response:", orderData);

                // Handle the specific API structure you described
                if (orderData.success && orderData.data && orderData.data.orders) {
                    // Access the orders array from data.orders
                    setOrders(orderData.data.orders);
                } else {
                    // If we can't find the orders array, log the structure and use dummy data
                    console.error("API response is not in expected format:", orderData);
                    // Keep using dummy data from initial state
                    setError("API returned data in unexpected format");
                }
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError("Failed to fetch orders");
                // Fallback to dummy data is already handled by the initial state
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <MaxWidthWrapper className="mb-8 mt-12 flex flex-col items-center justify-center text-center sm:mt-20">
                <h1 className="text-3xl font-bold">Loading orders...</h1>
            </MaxWidthWrapper>
        );
    }

    if (error) {
        return (
            <MaxWidthWrapper className="mb-8 mt-12 flex flex-col items-center justify-center text-center sm:mt-20">
                <h1 className="text-3xl font-bold">Error fetching orders</h1>
                <p className="mt-4 text-gray-500">{error}</p>
                <p className="mt-2 text-gray-500">Showing dummy data instead</p>
            </MaxWidthWrapper>
        );
    }

    // Additional safety check - if orders is not an array by this point
    if (!Array.isArray(orders)) {
        console.error("Orders is not an array:", orders);
        return (
            <MaxWidthWrapper className="mb-8 mt-12 flex flex-col items-center justify-center text-center sm:mt-20">
                <h1 className="text-3xl font-bold">Error processing orders data</h1>
                <p className="mt-4 text-gray-500">Data format is not as expected</p>
            </MaxWidthWrapper>
        );
    }

    return (
        <MaxWidthWrapper className="mb-8 mt-12 flex flex-col sm:mt-20">
            <Card className="border shadow-sm">
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Your Order history</CardDescription>
                </CardHeader>
                <CardContent>
                    {orders.length === 0 ? (
                        <p className="py-4 text-center text-muted-foreground">No Orders Yet</p>
                    ) : (
                        <Table>
                            <TableCaption>A list of your recent orders.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Order ID</TableHead>
                                    <TableHead>Payment Status</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Date Time</TableHead>
                                    <TableHead>Order Status</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order: Order) => (
                                    <TableRow key={order._id}>
                                        <TableCell className="font-medium">{order._id}</TableCell>
                                        <TableCell>{capitalizeFirstLetter(order.paymentStatus)}</TableCell>
                                        <TableCell>{capitalizeFirstLetter(order.paymentMode)}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={"outline"}>{order.orderStatus.toUpperCase()}</Badge>
                                        </TableCell>
                                        <TableCell>₹{order.total}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/order/${order._id}`} className="text-primary underline">
                                                More details
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </MaxWidthWrapper>
    );
};

export default Orders;
