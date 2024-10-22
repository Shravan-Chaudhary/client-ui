import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button size={"default"} className="w-full transition-all duration-300 ease-in-out" disabled={pending}>
            {pending ? (
                <span className="flex items-center justify-center space-x-2">
                    <p>Signing In</p>
                    <LoaderCircle className="size-4 animate-spin" />
                </span>
            ) : (
                <p>Sign In</p>
            )}
        </Button>
    );
};

export default SignInButton;
