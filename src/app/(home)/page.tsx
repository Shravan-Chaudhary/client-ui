import HeroSection from "@/app/(home)/_components/hero-section";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CatalogSection from "./_components/catalog-section";
import { Suspense } from "react";

export default async function Home() {
    return (
        <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
            <HeroSection />
            {/* Tabs */}
            <Suspense fallback={"loading..."}>
                <CatalogSection />
            </Suspense>
        </MaxWidthWrapper>
    );
}
