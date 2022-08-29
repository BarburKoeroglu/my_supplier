import {Category} from "./Category";

export type Product ={
    id: string,
    productName: string,
    itemNumber: string,
    description: string,
    category?: Category,
}
