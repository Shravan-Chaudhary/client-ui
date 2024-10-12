import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import CustomSelect from "./select";
import basket from "@/images/basket.png";
import Image from "next/image";
import Dot from "./dot";
import { cn } from "@/lib/utils";

const Navbar = () => {
    return (
        <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    {/* Logo */}
                    <Link href={"/"} className="z-40 flex items-center font-semibold">
                        {/* <Image
              src={energyDrink}
              alt='energy-drink'
              height={50}
              width={50}
              className='inline-flex sm:hidden'
            /> */}
                        <span className="">fuel.</span>
                    </Link>

                    {/* Menu Items */}
                    <div className=" flex items-center gap-4">
                        <div className="inline-flex font-medium text-gray-800">
                            <CustomSelect />
                        </div>

                        <div className="hidden sm:flex">
                            <Link href={"/menu"} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                                Menu
                            </Link>
                            <Link href={"/orders"} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                                Orders
                            </Link>

                            {/* Cart Icon */}
                            <Link
                                href={"/cart"}
                                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "relative mr-5")}
                            >
                                <Image src={basket} alt="basket" width={23} height={23} />
                                <Dot />
                            </Link>

                            <Link href={"/logout"} className="">
                                <Button size="sm" className="rounded-full px-5">
                                    Logout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
