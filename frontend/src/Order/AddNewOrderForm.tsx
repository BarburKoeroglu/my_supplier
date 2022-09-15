import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Order} from "./Order";
import axios from "axios";
import {Product} from "../supplier/Product";
import {MeasurementUnit} from "../supplier/MeasurementUnit";
import ShoppingCart from "./ShoppingCart";
import {useNavigate} from "react-router-dom";

type AddNewOrderProps = {
    addNewOrder: (productsToAdd: Product[]) => Promise<Order>,
    fetchAllOrders: (order: Order) => void;
}

export default function AddNewOrderForm(props: AddNewOrderProps) {

    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [productsToAdd, setProductsToAdd] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState("");
    const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>();
    const navigate = useNavigate();

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

    function addNewOrderOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.addNewOrder(productsToAdd)
            .then(() => navigate("/customer/orders"))
    }

    const addProductToOrder = (product: Product) => {
        product.quantity = quantity;
        product.measurementUnit = measurementUnit;
        setProductsToAdd(productsToAdd.concat(product));
    }

    const handleMeasurementUnitOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMeasurementUnit(event.target.value as MeasurementUnit);
    }

    return (
        <div>
            <h2>Merkliste</h2>
            <div className={"shoppingCart"}>
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
                    <td><ShoppingCart productToAdd={productsToAdd}/></td>
                    </tbody>
                </table>
            </div>
            <button className={"sendOrder"}>Bestellung senden</button>
            <h3>Produktliste</h3>
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
                            <td>{product.productName}</td>
                            <td>{product.itemNumber}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td><input placeholder={"Anzahl"}
                                       onChange={event => setQuantity(event.target.value)}/></td>
                            <td><label htmlFor="Kiste">Kiste: <input name="Einheit" id="Kiste" type="radio"
                                                                     value={MeasurementUnit.KISTE}
                                                                     onChange={handleMeasurementUnitOnChange}></input></label>

                                <label htmlFor="Kg">Kg : <input name="Einheit" id={"Kg"} type={"radio"}
                                                                value={MeasurementUnit.KG}
                                                                onChange={handleMeasurementUnitOnChange}></input></label>

                                <label htmlFor="Stueck">Stück: <input name="Einheit" id={"Stueck"} type={"radio"}
                                                                      value={MeasurementUnit.STUECK}
                                                                      onChange={handleMeasurementUnitOnChange}></input></label>

                                <label htmlFor="Bund">Bund: <input name="Einheit" id={"Bund"} type={"radio"}
                                                                   value={MeasurementUnit.BUND}
                                                                   onChange={handleMeasurementUnitOnChange}></input></label>

                                <label htmlFor="Topf">Topf: <input name="Einheit" id={"Topf"} type={"radio"}
                                                                   value={MeasurementUnit.TOPF}
                                                                   onChange={handleMeasurementUnitOnChange}></input></label>
                            </td>
                            <td>
                                <button type="button" onClick={() => addProductToOrder(product)}>zur Bestellung
                                    hinzufügen
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>)}
            </form>
        </div>
    );
}
