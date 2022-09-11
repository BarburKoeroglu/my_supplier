import {Category} from "./Category";
import {MeasurementUnit} from "./MeasurementUnit";

export type Product = {
    productId: string,
    productName: string,
    itemNumber: string,
    description: string,
    category?: Category,
    quantity: string,
    measurementUnit?: MeasurementUnit,
}
