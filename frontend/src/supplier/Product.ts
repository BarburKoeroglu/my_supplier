import {Category} from "./Category";

export type Product = {
    productId: string,
    productName: string,
    itemNumber: string,
    description: string,
    category?: Category,
    quantity: string,
    measurementUnit?: string,
}
