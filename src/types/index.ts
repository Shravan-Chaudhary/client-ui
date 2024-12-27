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
