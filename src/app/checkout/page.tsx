import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import CustomerDetailsCard from "./_components/customer-details-card";
import OrderSummaryCard from "./_components/order-summary-card";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function CheckoutPage({ searchParams }: { searchParams: { restaurantId: string } }) {
    const session = await getSession();

    const sParams = new URLSearchParams(searchParams);
    const existingQueryString = sParams.toString();

    sParams.append("return-to", `/checkout?${existingQueryString}`);

    if (!session) {
        redirect(`/sign-in?${sParams.toString()}`);
    }

    return (
        <MaxWidthWrapper className="mb-12 mt-10">
            <div className="grid size-full grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <CustomerDetailsCard />
                </div>
                <div className="lg:col-span-5">
                    <OrderSummaryCard />
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
