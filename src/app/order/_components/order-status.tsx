"use client";
import React, { useEffect } from "react";
import { Step, StepItem, Stepper, useStepper } from "@/components/stepper";
import { CheckCheck, FileCheck, Microwave, Package, PackageCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSingleOrder } from "@/lib/http/api";
import { Order } from "@/types";

const steps = [
    { label: "Received", icon: FileCheck, description: "We are confirming your order" },
    { label: "Confirmed", icon: Package, description: "We have started preparing your order" },
    { label: "Prepared", icon: Microwave, description: "Ready for the pickup" },
    { label: "Out for delivery", icon: PackageCheck, description: "Driver is on the way" },
    { label: "Delivered", icon: CheckCheck, description: "Order completed" },
] satisfies StepItem[];

const statusMapping = {
    received: 0,
    confirmed: 1,
    prepared: 2,
    out_for_delivery: 3,
    delivered: 4,
} as { [key: string]: number };

const StepperChanger = ({ orderId }: { orderId: string }) => {
    const { setStep } = useStepper();
    const { data } = useQuery<Order>({
        queryKey: ["orderStatus", orderId],
        queryFn: async () => {
            return await getSingleOrder(orderId).then((res) => res.data);
        },
        refetchInterval: 1000 * 30,
    });

    console.log("data", data);
    useEffect(() => {
        if (data) {
            const currentStatus = statusMapping[data.orderStatus] || 0;
            setStep(currentStatus + 1);
        }
    }, [data]);
    return <></>;
};

const OrderStatus = ({ orderId }: { orderId: string }) => {
    return (
        <Stepper initialStep={0} steps={steps} variant="circle-alt" className="py-8">
            {steps.map(({ label, icon }) => {
                return <Step key={label} label={label} checkIcon={icon} icon={icon}></Step>;
            })}
            <StepperChanger orderId={orderId} />
        </Stepper>
    );
};

export default OrderStatus;
