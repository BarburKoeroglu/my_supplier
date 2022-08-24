import {Product} from "./Product";


export type NewProduct = Omit<Product, "id">;
