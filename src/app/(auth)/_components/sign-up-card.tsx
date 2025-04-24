"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import register from "@/lib/actions/register";
import SignUpButton from "./sign-up-button";
import { errorToast, successToast } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const initialState = {
    type: "",
    message: "",
};

const SignupCard = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get("return-to");
    const [state, formAction] = useFormState(register, initialState);
    const [showPassword, setShowPassword] = useState(false);

    if (state?.type === "success") {
        if (returnTo) router.push(`${returnTo}`);
        else router.push("/");
    }

    useEffect(() => {
        if (state?.type === "success") {
            successToast(state.message || "Account created successfully!");
        } else if (state?.type === "error") {
            errorToast(state.message || "An error occurred. Please try again.");
        }
    }, [state]);

    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">Sign-up</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder="Jane"
                                required
                                type="text"
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Doe"
                                required
                                type="text"
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                id="email"
                                name="email"
                                placeholder="jane@gmail.com"
                                required
                                type="email"
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                id="password"
                                name="password"
                                required
                                type={showPassword ? "text" : "password"}
                                placeholder="******"
                                className="px-10"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="size-4 text-gray-400" />
                                ) : (
                                    <Eye className="size-4 text-gray-400" />
                                )}
                                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                        </div>
                    </div>
                    <SignUpButton />
                </form>
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
                <span className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        className="relative text-sm text-primary transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100"
                        href="/sign-in"
                    >
                        Sign In
                    </Link>
                </span>
            </CardFooter>
        </Card>
    );
};

export default SignupCard;
