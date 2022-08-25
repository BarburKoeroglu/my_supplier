import {ProductType} from "./ProductType";

type SingleProductProps = { product: ProductType }

export default function SingleProduct(props: SingleProductProps) {

    return (
        <>
            <td>{props.product.productName}</td>
            <td>{props.product.itemNumber}</td>
            <td>{props.product.description}</td>
            <td>{props.product.category}</td>
        </>
    )
}
