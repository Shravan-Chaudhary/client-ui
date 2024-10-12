import HeroSection from "@/app/(home)/_components/heroSection";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import CatalogSection from "./_components/catalogSection";
export default function Home() {
    return (
        <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
            <HeroSection />
            {/* Tabs */}
            <CatalogSection />
        </MaxWidthWrapper>
    );
}
