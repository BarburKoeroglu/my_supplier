import {Product} from "./Product";
import {NewProduct} from "./NewProduct";
import AddNewProduct from "./AddNewProduct";
import ProductSingleItem from "./ProductSingleItem";

type ProductListProps = {
    products: Product[],
    addProduct: (product: NewProduct) => Promise<Product>,
}

export default function ProductList(props: ProductListProps) {

    return (
        <span>
            <h2>Produktliste</h2>
            <ol>
                    {props.products.map(product =>
                    <li key={product.itemNumber}>
                        <ProductSingleItem/>
                    </li>
                )}

            </ol>
            <AddNewProduct addNewProduct={props.addProduct}/>
        </span>
    )
}
