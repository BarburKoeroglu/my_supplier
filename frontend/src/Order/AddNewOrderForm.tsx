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

    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [orderStatus, setOrderStatus] = useState<OrderStatus>();
    const [productToAdd, setProductToAdd] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState("");
    const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>();

    useEffect(() => {
        fetchAllProducts()
    }, []);
    const fetchAllProducts = () => {
        axios.get("/supplier/products")
            .then((response) => response.data)
            .then((data) => {
                setAllProducts(data);
                }
            )
    }

    const AddNewOrderSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const order: NewOrder = {
            products: allProducts,
            orderStatus: orderStatus,
        }

        props.addNewOrder(order)
            .then(() => {
                setAllProducts([]);
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

    function addNewOrderOnSubmit() {
        axios.post("/customer/orders", productToAdd)
            .catch((error) => {
                toast.error("Bitte alle Felder ausfüllen. " + error.message);
            })
    }

    const addProductToOrder = (product: Product) => {
        //  const newProductState = productToAdd?.map(
        //      orderProduct => {
        //          if (orderProduct.productId === productId) {
        //              return {
        //                  productId: orderProduct.productId,
        //                  productName: orderProduct.productName,
        //                  itemNumber: orderProduct.itemNumber,
        //                  description: orderProduct.description,
        //                  category: orderProduct.category,
        //                  quantity: quantity,
        //                  measurementUnit: measurementUnit
        //              }
        //          }
        //          return orderProduct;
        //      }
        //  )
        product.quantity = quantity;
        product.measurementUnit = measurementUnit;
        setProductToAdd((prevState) => {
            return [...prevState, product]
        });
    }

    const handleMeasurementUnitOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMeasurementUnit(event.target.value as MeasurementUnit);
    }


    return (
        <>

            <form onSubmit={addNewOrderOnSubmit}>
                {allProducts.map(product =>
                    <table>
                        <tbody>
                        <tr>
                            <th>Produkt</th>
                            <th>Artikelnummer</th>
                            <th>Beschreibung</th>
                            <th>Kategorie</th>
                            <th>Anzahl</th>
                            <th>Einheit</th>
                        </tr>
                        <tr>
                            <td>
                                {product.productName}
                                {product.itemNumber}
                                {product.description}
                                {product.category}
                                <input placeholder={"Anzahl"} value={quantity}
                                       onChange={event => setQuantity(event.target.value)}/>
                                <label htmlFor="Kiste">Kiste: <input name="Einheit" id="Kiste" type="radio"
                                                                     value={MeasurementUnit.KISTE}
                                                                     onChange={handleMeasurementUnitOnChange}></input></label>

                                <label htmlFor="Kg">Kg : <input name="Einheit" id={"Kg"} type={"radio"}
                                                                value={MeasurementUnit.KG}
                                                                onChange={handleMeasurementUnitOnChange}></input></label>

                                <label htmlFor="Stueck">Stück: <input name="Einheit" id={"Stueck"} type={"radio"}
                                                                      value={MeasurementUnit.STCK}
                                                                      onChange={handleMeasurementUnitOnChange}></input></label>

                                <label htmlFor="Bund">Bund: <input name="Einheit" id={"Bund"} type={"radio"}
                                                                   value={MeasurementUnit.BUND}
                                                                   onChange={handleMeasurementUnitOnChange}></input></label>

                                <label htmlFor="Topf">Topf: <input name="Einheit" id={"Topf"} type={"radio"}
                                                                   value={MeasurementUnit.TOPF}
                                                                   onChange={handleMeasurementUnitOnChange}></input></label>

                                <button type="submit" onClick={() => addProductToOrder(product)}>zur Bestellung
                                    hinzufügen
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>)}
                <button type={"submit"}>Bestellung senden</button>
                <button type="submit" onClick={() => setOrderOnHold()}>Bestellung zwischenspeichern</button>
            </form>
        </>
    );
}
