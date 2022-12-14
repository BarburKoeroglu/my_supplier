import {ChangeEvent, FormEvent, useState} from "react";
import {Category} from "./Category";
import {Product} from "./Product";
import {toast} from "react-toastify";
import {NewProduct} from "./NewProduct";
import {MeasurementUnit} from "./MeasurementUnit";
import "./AddNewProduct.css";

type AddProductProps = {
    addNewProduct: (product: NewProduct) => Promise<Product>,
}

export default function AddNewProduct(props: AddProductProps) {

    const [productName, setProductName] = useState<string>("");
    const [itemNumber, setItemNumber] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<Category>();
    //eslint-disable-next-line
    const [quantity, setQuantity] = useState("");
    //eslint-disable-next-line
    const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>();

    const AddProductSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const product: NewProduct = {
            productName: productName,
            itemNumber: itemNumber,
            description: description,
            category: category,
            quantity: quantity,
            measurementUnit: measurementUnit,
        }
        props.addNewProduct(product)
            .then(() => {
                setProductName("");
                setItemNumber("");
                setDescription("");
                setCategory(undefined)
            })
            .catch((error) => {
                toast.error("Bitte alle Felder ausfüllen. " + error.message)
            })
    }

    function onCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
        setCategory(event.target.value as Category);
    }

    return (
        <form className={"addProductBar"} onSubmit={AddProductSubmit}>
            <input placeholder={"Produkt"} value={productName} onChange={event => setProductName(event.target.value)}/>
            <input placeholder={"Artikelnummer"} value={itemNumber}
                   onChange={event => setItemNumber(event.target.value)}/>
            <input placeholder={"Beschreibung"} value={description}
                   onChange={event => setDescription(event.target.value)}/>
            <select id="category" name="category" onChange={onCategoryChange}>
                <option value="">Kategorie wählen</option>
                <option value={Category.OBST}>Obst</option>
                <option value={Category.GEMUESE}>Gemüse</option>
                <option value={Category.KRAEUTER}>Kräuter</option>
                <option value={Category.TROCKENSORTIMENT}>Trockensortiment</option>
            </select>
            <button type={"submit"}>speichern</button>
        </form>
    );
}
