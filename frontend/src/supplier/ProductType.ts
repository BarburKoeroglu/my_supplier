import {Category} from "./Category";

export type ProductType ={
    id: string,
    productName: string,
    itemNumber: string,
    description: string,
    category?: Category,
}
