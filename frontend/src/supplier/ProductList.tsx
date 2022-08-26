import {ProductType} from "./ProductType";
import {NewProduct} from "./NewProduct";
import AddNewProduct from "./AddNewProduct";
import SingleProduct from "./SingleProduct";
import {useNavigate} from "react-router-dom";

type ProductListProps = {
    products: ProductType[],
    addProduct: (product: NewProduct) => Promise<ProductType>,
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
                    <tr key={product.itemNumber}>
                        <SingleProduct product={product}/>
                        <button onClick={() => navigate("/supplier/products/{product.itemNumber}")}>Produktdetails</button>
                    </tr>
                )}
            </table>

        </span>
    )
}
