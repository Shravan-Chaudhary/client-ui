import HeroSection from "@/app/(home)/_components/hero-section";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import CatalogSection from "./_components/catalog-section";
import { Category, Product } from "./types";
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

    //TODO: Pagination and query parameters
    //TODO: Promise.all for fetching different categories products (OR)
    //TODO: fetch all products and filter them (Promise.all can be used to fetch products and categories in this case)
    const productsResponse = await fetch(process.env.BACKEND_URL + "/api/v1/inventory/products?tenantId=1", {
        next: {
            revalidate: ONE_HOUR_IN_SEC,
        },
    });

    if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
    }

    const products: Product[] = await productsResponse.json().then((response) => response.data.docs);
    console.log(products);

    return (
        <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
            <HeroSection />
            {/* Tabs */}
            <CatalogSection categories={categories} products={products} />
        </MaxWidthWrapper>
    );
}
