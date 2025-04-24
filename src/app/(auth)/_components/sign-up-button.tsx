import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button size={"default"} className="w-full transition-all duration-300 ease-in-out" disabled={pending}>
            {pending ? (
                <span className="flex items-center justify-center space-x-2">
                    <p>Signing Up</p>
                    <LoaderCircle className="size-4 animate-spin" />
                </span>
            ) : (
                <p>Sign Up</p>
            )}
        </Button>
    );
};

export default SignUpButton;
