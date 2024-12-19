import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import CustomerDetailsCard from "./_components/customer-details-card";
import OrderSummaryCard from "./_components/order-summary-card";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const CheckoutPage = async () => {
    const session = await getSession();

    if (!session) {
        redirect("/sign-in");
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
};

export default CheckoutPage;
