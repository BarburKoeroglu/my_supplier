import {ChangeEvent, FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {OrderStatus} from "./OrderStatus";
import {NewOrder} from "./NewOrder";

type AddOrderProps = {
    addNewOrder: (order: NewOrder) => Promise<Order>,
}

export default function AddNewOrder(props: AddOrderProps) {

    const [singleProductToOrder, setSingleProductToOrder] = useState<string>("");
    const [orderStatus, setOrderStatus] = useState<string>("");


    function onOrderStatusCustomer(event: ChangeEvent<HTMLSelectElement>) {
        setOrderStatus(event.target.value as OrderStatus);
    }

    return (
        <form onSubmit={AddOrderSubmit}>
            <button type={"submit"}>Bestellung senden</button>
            <button type={"submit"}>speichern</button>
        </form>
    );
}