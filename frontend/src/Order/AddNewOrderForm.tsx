import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Order} from "./Order";
import axios from "axios";
import {Product} from "../supplier/Product";
import {MeasurementUnit} from "../supplier/MeasurementUnit";
import ShoppingCart from "./ShoppingCart";

type AddNewOrderProps = {
    addNewOrder: (productsToAdd: Product[]) => Promise<Order>,
}

export default function AddNewOrderForm(props: AddNewOrderProps) {

    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [productsToAdd, setProductsToAdd] = useState<Product[]>([]);
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

    function addNewOrderOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.addNewOrder(productsToAdd)
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
        <>
            <h2>Merkliste</h2>
            <ShoppingCart productToAdd={productsToAdd}/>
            <h3>alle Produkte</h3>
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
                                <input placeholder={"Anzahl"}
                                       onChange={event => setQuantity(event.target.value)}/>
                                <label htmlFor="Kiste">Kiste: <input name="Einheit" id="Kiste" type="radio"
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

                                <button type="button" onClick={() => addProductToOrder(product)}>zur Bestellung
                                    hinzufügen
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>)}
                <button>Bestellung senden</button>
            </form>
        </>
    );
}
