import React from "react";
import Pill from "@/components/pill";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pizza } from "lucide-react";
import Image from "next/image";
import pizza from "@/images/pizza.png";

const HeroSection = () => {
    return (
        <>
            {/* Hero Container */}
            <div className="flex justify-between">
                {/* Branding */}
                <div className="">
                    <Pill>Ranked #1 in India</Pill>
                    <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
                        Fuel your <span className="text-primary">Gaming </span> with Epic Fuel.
                    </h1>
                    <p className="mt-7 max-w-prose text-zinc-700 sm:text-lg">
                        We fuel your epic quests without interrupting gameplay. Recharge your energy with just a click
                        and keep the snacks coming for those late-night sessions!
                    </p>
                    <Link href={"/"}>
                        <Button size={"lg"} className="mt-5 rounded-full">
                            Order Now <Pizza className="ml-2 size-5" />
                        </Button>
                    </Link>
                    <div></div>
                </div>

                {/* Pizza */}
                <Image
                    src={pizza}
                    alt="pizza"
                    height={500}
                    width={500}
                    className="-z-0 hidden max-h-[500px] max-w-[500px] lg:inline-flex"
                />
            </div>
        </>
    );
};

export default HeroSection;
