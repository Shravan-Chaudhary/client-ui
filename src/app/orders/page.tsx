"use client";

import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order } from "@/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/utils";

// Dummy orders for fallback
const dummyOrders: Order[] = [
    {
        _id: "ORD001",
        customerId: "CUST123",
        total: 2500,
        discount: 0,
        taxes: 250,
        deliveryCharges: 50,
        address: "123 Main St, New York, NY 10001",
        tenantId: "TENANT01",
        comment: "Please leave at the door",
        paymentMode: "Credit Card",
        orderStatus: "Delivered",
        paymentStatus: "Paid",
        paymentId: "PAY123456",
        createdAt: "2023-04-15T14:32:11.000Z",
    },
    {
        _id: "ORD002",
        customerId: "CUST456",
        total: 1500,
        discount: 100,
        taxes: 150,
        deliveryCharges: 50,
        address: "456 Park Ave, Boston, MA 02215",
        tenantId: "TENANT01",
        paymentMode: "PayPal",
        orderStatus: "Processing",
        paymentStatus: "Pending",
        paymentId: "PAY789012",
        createdAt: "2023-04-16T09:45:23.000Z",
    },
    {
        _id: "ORD003",
        customerId: "CUST789",
        total: 3500,
        discount: 0,
        taxes: 350,
        deliveryCharges: 0,
        address: "789 Broadway, San Francisco, CA 94105",
        tenantId: "TENANT01",
        comment: "Call before delivery",
        paymentMode: "Bank Transfer",
        orderStatus: "Canceled",
        paymentStatus: "Unpaid",
        createdAt: "2023-04-17T16:21:05.000Z",
    },
    {
        _id: "ORD004",
        customerId: "CUST234",
        total: 4500,
        discount: 500,
        taxes: 400,
        deliveryCharges: 100,
        address: "234 Grove St, Chicago, IL 60007",
        tenantId: "TENANT01",
        paymentMode: "Credit Card",
        orderStatus: "Delivered",
        paymentStatus: "Paid",
        paymentId: "PAY345678",
        createdAt: "2023-04-18T11:15:32.000Z",
    },
    {
        _id: "ORD005",
        customerId: "CUST567",
        total: 5500,
        discount: 0,
        taxes: 550,
        deliveryCharges: 100,
        address: "567 Elm St, Los Angeles, CA 90001",
        tenantId: "TENANT01",
        paymentMode: "PayPal",
        orderStatus: "Delivered",
        paymentStatus: "Paid",
        paymentId: "PAY901234",
        createdAt: "2023-04-19T15:42:18.000Z",
    },
    {
        _id: "ORD006",
        customerId: "CUST890",
        total: 2000,
        discount: 200,
        taxes: 180,
        deliveryCharges: 70,
        address: "890 Oak St, Seattle, WA 98101",
        tenantId: "TENANT01",
        comment: "Fragile items",
        paymentMode: "Bank Transfer",
        orderStatus: "Processing",
        paymentStatus: "Pending",
        createdAt: "2023-04-20T10:33:47.000Z",
    },
    {
        _id: "ORD007",
        customerId: "CUST345",
        total: 3000,
        discount: 150,
        taxes: 285,
        deliveryCharges: 75,
        address: "345 Pine St, Miami, FL 33101",
        tenantId: "TENANT01",
        paymentMode: "Credit Card",
        orderStatus: "Pending",
        paymentStatus: "Unpaid",
        createdAt: "2023-04-21T13:27:55.000Z",
    },
];

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>(dummyOrders);
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
            <Table className="border-separate border-spacing-0 overflow-hidden rounded-2xl border border-gray-400 bg-white">
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
        </MaxWidthWrapper>
    );
};

export default Orders;
