import { PriceType, WidgetType } from "@/constants";

export type ProductAttributes = {
    name: string;
    value: string | boolean;
};
export interface ProductPriceConfiguration {
    [key: string]: {
        priceType: PriceType.BASE | PriceType.ADDITIONAL;
        availableOptions: {
            [key: string]: number;
        };
    };
}

export type Product = {
    _id: string;
    name: string;
    description: string;
    image: string;
    categoryId: string;
    category: Category;
    priceConfiguration: ProductPriceConfiguration;
    attributes: ProductAttributes[];
    isPublished: boolean;
    createdAt: string;
};

export interface CategoryAttribute {
    name: string;
    widgetType: WidgetType.SWITCH | WidgetType.RADIO;
    defaultValue: string;
    availableOptions: string[];
}

export interface CategoryPriceConfiguration {
    [key: string]: {
        priceType: PriceType.BASE | PriceType.ADDITIONAL;
        availableOptions: string[];
    };
}

export interface Category {
    _id: string;
    name: string;
    priceConfiguration: CategoryPriceConfiguration;
    attributes: CategoryAttribute[];
}

export type Topping = {
    _id: string;
    name: string;
    image: string;
    price: number;
    isAvailable: boolean;
};
