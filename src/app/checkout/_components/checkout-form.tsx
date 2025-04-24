"use client";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createOrder, getCustomer } from "@/lib/http/api";
import { Customer, OrderData } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CoinsIcon } from "lucide-react";
import AddAddress from "./add-address";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import OrderSummary from "./order-summary";
import { useAppSelector } from "@/lib/store/hooks";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
    address: z.string({ required_error: "Select an address" }),
    paymentMode: z.enum(["card", "cash"], { required_error: "Select a payment mode" }),
});

const CheckoutForm = () => {
    const customerForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const cart = useAppSelector((state) => state.cart);
    const chosenCouponCode = useRef("");
    const idempotencyKeyRef = useRef("");
    const searchParams = useSearchParams();

    const { data: customer, isLoading } = useQuery<Customer>({
        queryKey: ["customer"],
        queryFn: async () => {
            const response = await getCustomer();
            return response.data.data.customer;
        },
    });

    const { mutate, isPending: isPlaceOrderPending } = useMutation({
        mutationKey: ["order"],
        mutationFn: async (data: OrderData) => {
            const idempotencyKey = idempotencyKeyRef.current
                ? idempotencyKeyRef.current
                : (idempotencyKeyRef.current = uuidv4() + customer?._id);
            await createOrder(data, idempotencyKey);
        },
        retry: 3,
    });

    const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        const tenantId = searchParams.get("restaurantId");
        if (!tenantId) {
            alert("Restaurant Id is required");
            return;
        }
        const orderData: OrderData = {
            cart: cart.cartItems,
            couponCode: chosenCouponCode.current ? chosenCouponCode.current : "",
            tenantId: tenantId,
            customerId: customer ? customer?._id : "",
            address: data.address,
            paymentMode: data.paymentMode,
        };
        mutate(orderData);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!customer) {
        return <div>No customer found</div>;
    }

    return (
        <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
                <div className="grid size-full grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <Card className="flex w-full flex-col justify-between rounded-3xl border-none">
                            <CardContent className="mt-5">
                                <h2 className="text-xl font-bold">Customer Details</h2>
                                <div className="mt-4 space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <div className="relative">
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                required
                                                type="text"
                                                className=""
                                                defaultValue={customer.firstName}
                                                disabled
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            ></Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <div className="relative">
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                required
                                                type="text"
                                                className=""
                                                defaultValue={customer.lastName}
                                                disabled
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            ></Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            required
                                            type="email"
                                            className=""
                                            defaultValue={customer.email}
                                            disabled
                                        />
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className=" mt-5 flex items-center justify-between sm:mt-6">
                                    <h3 className="text-lg font-semibold">Address</h3>
                                    <AddAddress customerId={customer._id} />
                                </div>
                                <div className="mt-4 flex w-full flex-col gap-1 sm:mt-4 sm:gap-2">
                                    <FormField
                                        name="address"
                                        control={customerForm.control}
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            className="mt-2 grid grid-cols-2 gap-6"
                                                        >
                                                            {customer.addresses.map((address) => (
                                                                <div
                                                                    key={address.text}
                                                                    className="rounded-lg border-2 bg-white px-6 py-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <FormControl>
                                                                            <RadioGroupItem
                                                                                value={address.text}
                                                                                id={address.text}
                                                                                className="border-primary text-primary"
                                                                            />
                                                                        </FormControl>
                                                                        <Label
                                                                            htmlFor={address.text}
                                                                            className="grow cursor-pointer"
                                                                        >
                                                                            {address.text}
                                                                        </Label>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>

                                {/* Payment Select */}
                                <div className="mt-6 flex flex-col gap-3">
                                    <h1 className="text-lg font-semibold">Payment Mode</h1>
                                    <FormField
                                        name="paymentMode"
                                        control={customerForm.control}
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            className="flex items-center gap-4 lg:gap-5"
                                                        >
                                                            <div>
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value="card"
                                                                        id="card"
                                                                        className="peer sr-only"
                                                                    />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor="card"
                                                                    className="flex w-[140px] max-w-[180px] flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary sm:w-[180px] [&:has([data-state=checked])]:border-primary"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        className="mb-3 size-6"
                                                                    >
                                                                        <rect
                                                                            width="20"
                                                                            height="14"
                                                                            x="2"
                                                                            y="5"
                                                                            rx="2"
                                                                        />
                                                                        <path d="M2 10h20" />
                                                                    </svg>
                                                                    Card
                                                                </Label>
                                                            </div>
                                                            <div>
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value="cash"
                                                                        id="cash"
                                                                        className="peer sr-only"
                                                                    />
                                                                </FormControl>

                                                                <Label
                                                                    htmlFor="cash"
                                                                    className="flex w-[140px] max-w-[180px] flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary sm:w-[180px] [&:has([data-state=checked])]:border-primary"
                                                                >
                                                                    <CoinsIcon className="mb-3 size-6" />
                                                                    Cash
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>

                                {/* Comment */}
                            </CardContent>
                        </Card>
                    </div>
                    {/* ORder Summary */}
                    <div className="lg:col-span-5">
                        <OrderSummary
                            isPlaceOrderPending={isPlaceOrderPending}
                            handleCouponCodeChange={(code) => {
                                chosenCouponCode.current = code;
                            }}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default CheckoutForm;
