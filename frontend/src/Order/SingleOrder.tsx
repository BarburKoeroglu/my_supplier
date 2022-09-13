import {Order} from "./Order";

type SingleOrderProps = {
    order: Order | undefined,
}

export default function SingleOrder(props: SingleOrderProps) {

    return (
        <>
            <tr>
                <td>{props.order?.orderId}</td>
                <td>{props.order?.products.length}</td>
                <td>{props.order?.orderStatus}</td>
            </tr>
        </>
    )
}
