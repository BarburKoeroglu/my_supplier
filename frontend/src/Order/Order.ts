import {OrderStatus} from "./OrderStatus";
import {SingleProductToOrder} from "./SingleProductToOrder";

export type Order = {
    orderId: string,
    singleProductToOrder: SingleProductToOrder,
    orderStatus: OrderStatus,
}