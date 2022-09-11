import {OrderStatus} from "./OrderStatus";
import {Product} from "../supplier/Product";

export type Order = {
    orderId: string,
    products: Product[],
    orderStatus?: OrderStatus,
}
