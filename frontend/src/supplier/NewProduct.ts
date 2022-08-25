import {ProductType} from "./ProductType";

export type NewProduct = Omit<ProductType, "id">;
