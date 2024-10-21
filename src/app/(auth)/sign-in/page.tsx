import React from "react";
import SigninCard from "../_components/sign-in-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const SigninPage = () => {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <MaxWidthWrapper>
                <SigninCard />
            </MaxWidthWrapper>
        </div>
    );
};

export default SigninPage;
