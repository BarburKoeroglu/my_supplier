import {useNavigate} from "react-router-dom";
import {NewOrder} from "./NewOrder";
import {Order} from "./Order";
import SingleOrder from "./SingleOrder";

type OrderListProps = {
    orders: Order[] | undefined,
    addOrder: (order: NewOrder) => Promise<Order>,
}

export default function OrderList(props: OrderListProps) {
    const navigate = useNavigate();

    return (
        <span>
            <h2>Bestellungen</h2>
            <button onClick={() => navigate("/customer/orders/newOrder")}>neue Bestellung</button>
            <table>
                <tbody>
                <tr>
                    <th>Bestellnummer</th>
                    <th>Inhalte</th>
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
