import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductSkeletonList = () => {
    const skeletonArray = Array(4).fill(null);
    return (
        <div className="mx-auto flex w-full flex-col items-center justify-center">
            <Skeleton className="h-10 w-[175px] rounded-full" />
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {skeletonArray.map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[175px] w-[300px] rounded-xl md:w-[350]" />
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-[300px] md:w-[350]" />
                            <Skeleton className="h-8 w-[300px] md:w-[350]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSkeletonList;
