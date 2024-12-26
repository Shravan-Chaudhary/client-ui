"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CoinsIcon, Plus } from "lucide-react";

const CustomerDetailsCard = () => {
    return (
        <Card className="flex w-full flex-col justify-between rounded-3xl border-none">
            <CardContent className="mt-5">
                <h2 className="text-xl font-bold">Customer Details</h2>
                <form className="mt-4 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                            <Input id="firstName" name="firstName" required type="text" className="" />
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
                            <Input id="lastName" name="lastName" required type="text" className="" />
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
                        <Input id="email" name="email" required type="email" className="pl-10" />
                    </div>
                </form>

                {/* Address Section */}
                <div className="mt-4 flex flex-col gap-1 sm:mt-6 sm:gap-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Address</h3>
                        <Button variant={"link"} size={"sm"}>
                            <Plus className="mr-1 size-4" />
                            Add New Address
                        </Button>
                    </div>
                    <RadioGroup defaultValue="hello" className="flex flex-col items-center gap-4 sm:flex-row lg:gap-5">
                        <div className="rounded-lg border-2 bg-white px-6 py-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hello" id="hello" className="border-primary text-primary" />
                                <Label htmlFor="hello" className="grow cursor-pointer">
                                    Hello
                                </Label>
                            </div>
                        </div>
                        <div className="rounded-lg border-2 bg-white px-6 py-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="world" id="world" className="border-primary text-primary" />
                                <Label htmlFor="world" className="grow cursor-pointer">
                                    World
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>

                {/* Payment Select */}
                <div className="mt-6 flex flex-col gap-3">
                    <h1 className="text-lg font-semibold">Payment Mode</h1>
                    <RadioGroup defaultValue="card" className="flex items-center gap-4 lg:gap-5">
                        <div>
                            <RadioGroupItem value="card" id="card" className="peer sr-only" />
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
                                    <rect width="20" height="14" x="2" y="5" rx="2" />
                                    <path d="M2 10h20" />
                                </svg>
                                Card
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                            <Label
                                htmlFor="cash"
                                className="flex w-[140px] max-w-[180px] flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary sm:w-[180px] [&:has([data-state=checked])]:border-primary"
                            >
                                <CoinsIcon className="mb-3 size-6" />
                                Cash
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Comment */}
            </CardContent>
        </Card>
    );
};

export default CustomerDetailsCard;
