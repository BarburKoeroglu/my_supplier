import {Product} from "./Product";
import {NewProduct} from "./NewProduct";
import AddNewProduct from "./AddNewProduct";
import SingleProduct from "./SingleProduct";
import {useNavigate} from "react-router-dom";
import "./ProductList.css";

type ProductListProps = {
    products: Product[],
    addProduct: (product: NewProduct) => Promise<Product>,
}

export default function ProductList(props: ProductListProps) {

    const navigate = useNavigate();

    return (
        <span>
            <h2>Produktliste</h2>
            <AddNewProduct addNewProduct={props.addProduct}/>
            <table>
                <tr>
                    <th>Produkt</th>
                    <th>Artikelnummer</th>
                    <th>Beschreibung</th>
                    <th>Kategorie</th>
                </tr>
                {props.products.map((product) =>
                    <tr key={product.id}>
                        <SingleProduct product={product}/>
                        <button onClick={() => navigate("/supplier/products/" + product.id)}>Produktdetails</button>
                    </tr>
                )}
            </table>
        </span>
    )
}
