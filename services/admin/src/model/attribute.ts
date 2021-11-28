export interface BookAttribute {
    id: string;
    name: string;
    price: number;
    totalStock: number;
    salePrice: number;
    salePriceStartDate: Date;
    salePriceEndDate: Date;
}

export interface Attribute {
    id: string;
    name: string;
}