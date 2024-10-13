import HeroSection from "@/app/(home)/_components/hero-section";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CatalogSection from "./_components/catalog-section";
import { Category } from "./types";
import { ONE_HOUR_IN_SEC } from "@/constants";

export default async function Home() {
    const categoryResponse = await fetch(process.env.BACKEND_URL + "/api/v1/inventory/categories", {
        next: {
            revalidate: ONE_HOUR_IN_SEC,
        },
    });

    if (!categoryResponse.ok) {
        throw new Error("Failed to fetch categories");
    }

    const categories: Category[] = await categoryResponse.json().then((response) => response.data);
    console.log(categories);

    return (
        <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
            <HeroSection />
            {/* Tabs */}
            <CatalogSection categories={categories} />
        </MaxWidthWrapper>
    );
}
