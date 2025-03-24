import React, { ReactNode } from "react";

const Pill = ({ children }: { children?: ReactNode }) => {
    return (
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
            <p className="text-sm font-semibold text-gray-700">{children}</p>
        </div>
    );
};

export default Pill;
