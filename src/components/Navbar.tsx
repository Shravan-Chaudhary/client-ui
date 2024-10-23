import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import TenantSelector from "./tenant-selector";
import { Restaurant } from "@/types";
import { ONE_HOUR_IN_SEC } from "@/constants";
import CartIcon from "./cart-icon";
import { getSession } from "@/lib/session";
import LogoutButton from "./logout-button";

const Navbar = async () => {
    const session = await getSession();
    const restaurantsResponse = await fetch(process.env.BACKEND_URL + "/api/v1/auth/tenants", {
        next: {
            revalidate: ONE_HOUR_IN_SEC,
        },
    });

    if (!restaurantsResponse.ok) {
        throw new Error("Failed to fetch restaurants");
    }

    const restaurants: Restaurant[] = await restaurantsResponse.json().then((response) => response.data);

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
                            {/*TODO: Remove tenant selector from other pages */}
                            <TenantSelector restaurants={restaurants} />
                        </div>

                        <div className="hidden sm:flex">
                            <Link href={"/menu"} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                                Menu
                            </Link>
                            <Link href={"/orders"} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                                Orders
                            </Link>

                            {/* Cart Icon */}
                            <CartIcon />
                            {/* Login/Logout button */}
                            {session ? (
                                <LogoutButton />
                            ) : (
                                <Link href={"/sign-in"} className="">
                                    <Button size="sm" className="rounded-full px-5">
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
