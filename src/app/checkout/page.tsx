import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import CheckoutForm from "./_components/checkout-form";
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
            <CheckoutForm />
        </MaxWidthWrapper>
    );
}
