import {Order} from "./Order";

export type NewOrder = Omit<Order, "orderId">;