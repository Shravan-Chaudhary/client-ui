export type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
};

export type Topping = {
    id: string;
    name: string;
    image: string;
    price: number;
    isAvailable: boolean;
};
