import { Product, Topping } from "@/app/(home)/types";

export type CustomizationOption = {
    value: string;
    label: string;
    image?: string;
};

export type Restaurant = {
    id: number;
    name: string;
    address: string;
};

export type Address = {
    text: string;
    isDefault: boolean;
};

export type Customer = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    addresses: Address[];
};

export type CouponData = {
    code: string;
    tenantId: string;
};

export interface CartItem extends Pick<Product, "_id" | "name" | "image" | "priceConfiguration"> {
    selectedConfig: {
        selectedPriceConfig: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    };
    qty: number;
    hash?: string;
}

export type OrderData = {
    cart: CartItem[];
    couponCode: string;
    tenantId: string;
    customerId: string;
    comment?: string;
    address: string;
    paymentMode: string;
};

export interface Order {
    _id: string;
    customerId: Customer;
    total: number;
    discount: number;
    taxes: number;
    deliveryCharges: number;
    address: string;
    tenantId: string;
    comment?: string;
    paymentMode: string;
    orderStatus: string;
    paymentStatus: string;
    paymentId?: string;
    createdAt: string;
}
