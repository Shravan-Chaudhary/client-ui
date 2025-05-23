import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Link } from "@nextui-org/react";
import React from "react";

const BasicBanner = () => {
    return (
        <div className="border-b-1 border-divider flex w-full items-center gap-x-3 bg-background/[0.15] px-6 py-2 backdrop-blur-xl sm:px-3.5 sm:before:flex-1">
            <p className="text-small text-foreground">
                <Link className="text-inherit" href="#">
                    The Winter 2024 Release is here: new editor, analytics API, and so much more.&nbsp;
                </Link>
            </p>
            <Button
                as={Link}
                className="text-small group relative h-9 overflow-hidden bg-transparent font-normal"
                color="default"
                endContent={
                    <Icon
                        className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
                        icon="solar:arrow-right-linear"
                        width={16}
                    />
                }
                href="#"
                style={{
                    border: "solid 2px transparent",
                    backgroundImage: `linear-gradient(hsl(var(--nextui-background)), hsl(var(--nextui-background))), linear-gradient(to right, #F871A0, #9353D3)`,
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                }}
                variant="bordered"
            >
                Explore
            </Button>
            <div className="flex flex-1 justify-end">
                <Button isIconOnly className="-m-1" size="sm" variant="light">
                    <span className="sr-only">Close Banner</span>
                    <Icon className="text-default-500" icon="lucide:x" width={20} />
                </Button>
            </div>
        </div>
    );
};

export default BasicBanner;
