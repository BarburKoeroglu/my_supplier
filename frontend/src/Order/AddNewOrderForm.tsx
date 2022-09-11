import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {OrderStatus} from "./OrderStatus";
import {NewOrder} from "./NewOrder";
import {Order} from "./Order";
import {toast} from "react-toastify";
import axios from "axios";
import {Product} from "../supplier/Product";
import {MeasurementUnit} from "../supplier/MeasurementUnit";

type AddNewOrderProps = {
    addNewOrder: (order: NewOrder) => Promise<Order>,
}

export default function AddNewOrderForm(props: AddNewOrderProps) {

    const [products, setProducts] = useState<Product[]>([])
    const [orderStatus, setOrderStatus] = useState<OrderStatus>();
    const [orderProducts, setOrderProducts] = useState<Product[]>(products);
    const [quantity, setQuantity] = useState("");
    const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>();

    useEffect(() => {
        fetchAllProducts()
    }, []);
    const fetchAllProducts = () => {
        axios.get("/supplier/products")
            .then((response) => response.data)
            .then((data) => {
                    setProducts(data);
                    setOrderProducts(data)
                }
            )
    }

    const AddNewOrderSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        orderStatusChange();

        const order: NewOrder = {
            products: products,
            orderStatus: orderStatus,
        }

        props.addNewOrder(order)
            .then(() => {
                setProducts([]);
                setOrderStatus(undefined);
            })
            .catch((error) => {
                toast.error("Bitte alle Felder ausfüllen. " + error.message)
            })
    }

    function orderStatusChange() {
        setOrderStatus(OrderStatus.sent);
    }

    function setOrderOnHold() {
        setOrderStatus(OrderStatus.pending);
    }

    function onMeasurementUnitSelect(event: ChangeEvent<HTMLSelectElement>) {
        setMeasurementUnit(event.target.value as MeasurementUnit);
    }

    function addNewOrderOnSubmit() {
        axios.post("/customer/orders", orderProducts)
            .catch((error) => {
                toast.error("Bitte alle Felder ausfüllen. " + error.message);
            })
    }

    const updateOrderProducts = (productId: string, quantity: string) => {
        const newProductState = orderProducts?.map(
            orderProduct => {
                if (orderProduct.productId == productId) {
                    return {
                        productId: orderProduct.productId,
                        productName: orderProduct.productName,
                        itemNumber: orderProduct.itemNumber,
                        description: orderProduct.description,
                        category: orderProduct.category,
                        quantity: quantity,
                        measurementUnit: measurementUnit
                    }
                }
                return orderProduct;
            }
        )
        setOrderProducts(newProductState);
    }

    return (
        <>

            <form onSubmit={addNewOrderOnSubmit}>
                {orderProducts?.map(product =>
                    <p>
                        {product.productName}
                        {product.itemNumber}
                        {product.description}
                        {product.category}
                        <input placeholder={"Anzahl"} value={product.quantity}
                               onChange={event => updateOrderProducts(product.productId, event.target.value)}/>
                        <label htmlFor="Kiste">Kiste</label>
                        <input name="Einheit" id={"Kiste"} type={"radio"} value={MeasurementUnit.KISTE}></input>
                        <label htmlFor="Kg">Kg</label>
                        <input name="Einheit" id={"Kg"} type={"radio"} value={MeasurementUnit.KG}></input>
                        <label htmlFor="Stueck">Stück</label>
                        <input name="Einheit" id={"Stueck"} type={"radio"} value={MeasurementUnit.STCK}></input>
                        <label htmlFor="Bund">Bund</label>
                        <input name="Einheit" id={"Bund"} type={"radio"} value={MeasurementUnit.BUND}></input>
                        <label htmlFor="Topf">Topf</label>
                        <input name="Einheit" id={"Topf"} type={"radio"} value={MeasurementUnit.TOPF}></input>
                        <button type="button">zur Bestellung hinzufügen</button>
                    </p>)}
                <button type={"submit"}>Bestellung senden</button>
                <button onSubmit={setOrderOnHold}>Bestellung zwischenspeichern</button>
            </form>
        </>
    );
}
