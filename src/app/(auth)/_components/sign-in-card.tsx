"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SigninCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">Sign-in</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input id="email" placeholder="jane@gmail.com" required type="email" className="pl-10" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            id="password"
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
                <Button
                    size={"default"}
                    className="w-full transition-all duration-300 ease-in-out"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Submit
                    <Send
                        className={`ml-3 size-4 transition-all duration-300 ease-in-out ${
                            isHovered ? "-translate-y-1 translate-x-1" : ""
                        }`}
                    />
                </Button>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
                <Link
                    className="relative text-sm text-primary transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100"
                    href="#"
                >
                    Forgot password?
                </Link>
                <Link
                    className="relative text-sm text-primary transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100"
                    href="/sign-up"
                >
                    Sign up
                </Link>
            </CardFooter>
        </Card>
    );
};

export default SigninCard;
