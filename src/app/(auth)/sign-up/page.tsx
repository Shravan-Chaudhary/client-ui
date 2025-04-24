import React from "react";
import SignupCard from "../_components/sign-up-card";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const SignupPage = () => {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <MaxWidthWrapper>
                <SignupCard />;
            </MaxWidthWrapper>
        </div>
    );
};

export default SignupPage;
