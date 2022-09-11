import {useEffect, useState} from "react";
import {Order} from "./Order";
import {NewOrder} from "./NewOrder";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function useOrders() {

    const [orders, setOrders] = useState<Order[]>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllOrders()
    }, []);

    const addOrder = (newOrder: NewOrder) => {
        return axios.post("/customer/orders/newOrder", newOrder)
            .then((response) => {
                fetchAllOrders()
                return response.data
            })
    }

    const fetchAllOrders = () => {
        axios.get("/customer/orders")
            .then((response) => response.data)
            .then((data) => setOrders(data))
    }

    const editOrder = (order: Order) => {
        axios.put("/customer/orders/" + order.orderId, order)
            .then(() => navigate("/customer/orders" + order.orderId))
            .then(fetchAllOrders)
    }

    const deleteOrder = (id: string) => {
        return axios.delete(`/customer/orders/${id}`)
            .then(() => navigate("/customer/orders"))
            .then(fetchAllOrders)
    }

    return {orders, addOrder, fetchAllOrders, editOrder, deleteOrder}
}