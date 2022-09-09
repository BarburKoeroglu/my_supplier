import {Category} from "../supplier/Category";
import {MeasurementUnit} from "../supplier/MeasurementUnit";

export type SingleProductToOrder = {
    productId: string,
    productName: string,
    itemNumber: string,
    description: string,
    category?: Category,
    quantity: string,
    measurementUnit: MeasurementUnit,
}