import {useNavigate} from "react-router-dom";

import {Order} from "./Order";
import SingleOrder from "./SingleOrder";
import {Product} from "../supplier/Product";
import "./OrderList.css"

type OrderListProps = {
    orders: Order[] | undefined,
    addOrder: (productsToOrder: Product[]) => Promise<Order>,
}

export default function OrderList(props: OrderListProps) {
    const navigate = useNavigate();

    return (
        <span>
            <h2>Bestellungen</h2>
            <button className={"newOrder"}
                    onClick={() => navigate("/customer/orders/newOrder")}>neue Bestellung</button>
            <table>
                <tbody>
                <tr>
                    <th>Bestellnummer</th>
                    <th>Produkte</th>
                    <th>Bestellstatus</th>
                </tr>
                {props.orders?.map((order) =>
                    <tr key={order.orderId}>
                        <SingleOrder order={order}/>
                        <td>
                            <button onClick={() => navigate("/customer/orders/" + order.orderId)}>Bestelldetails
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </span>
    )
}
