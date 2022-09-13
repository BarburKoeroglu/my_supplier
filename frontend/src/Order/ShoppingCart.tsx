import {Product} from "../supplier/Product";

type ShoppingCartProps = {
    productToAdd: Product[],
}

export default function ShoppingCart(props: ShoppingCartProps) {


    return (
        <div>
            {props.productToAdd.map(product =>
                <p>
                    {product.productName}
                    {product.itemNumber}
                    {product.description}
                    {product.category}
                    {product.quantity}
                    {product.measurementUnit}
                </p>)}
        </div>
    )
}
