import {ChangeEvent, FormEvent, useState} from "react";
import {Category} from "./Category";
import {ProductType} from "./ProductType";
import {toast} from "react-toastify";
import {NewProduct} from "./NewProduct";

type AddProductProps = {
    addNewProduct: (product: NewProduct) => Promise<ProductType>,
}

export default function AddNewProduct(props: AddProductProps) {

    const [productName, setProductName] = useState<string>("");
    const [itemNumber, setItemNumber] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<Category>();

    const AddProductSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const product: NewProduct = {
            productName: productName,
            itemNumber: itemNumber,
            description: description,
            category: category,
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
        <form onSubmit={AddProductSubmit}>
            <input placeholder={"Produkt"} value={productName} onChange={event => setProductName(event.target.value)}/>
            <input placeholder={"Artikelnummer"}value={itemNumber} onChange={event => setItemNumber(event.target.value)}/>
            <input placeholder={"Beschreibung"}value={description} onChange={event => setDescription(event.target.value)}/>
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
