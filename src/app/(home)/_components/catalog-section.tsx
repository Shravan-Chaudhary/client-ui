import React, { Suspense } from "react";
import Image from "next/image";
import menu from "@/images/menu.png";
import ProductList from "./product-list";
import ProductSkeletonList from "./product-skeleton-list";

interface PropTypes {
    searchParams: {
        restaurantId: string;
    };
}

const CatalogSection: React.FC<PropTypes> = async ({ searchParams }) => {
    return (
        <section className="mt-[50px]">
            <div>
                <h1 className="mb-14 text-2xl font-bold md:text-4xl lg:text-5xl">
                    <span>Choose from Epic Catalogue</span>{" "}
                    <Image src={menu} alt="flame" className="inline-block size-8 sm:size-12" />
                </h1>
            </div>

            <div className="flex items-center justify-center">
                <Suspense fallback={<ProductSkeletonList />}>
                    <ProductList searchParams={searchParams} />
                </Suspense>
            </div>
        </section>
    );
};

export default CatalogSection;
