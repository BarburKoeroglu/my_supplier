import {useState} from "react";
import {Product} from "./Product";
import {NewProduct} from "./NewProduct";
import axios from "axios";


export default function useProducts() {

    const [products, setProducts] = useState<Product[]>([]);

    const addProduct = (newProduct: NewProduct) => {

        return axios.post("/supplier/products", newProduct)
            .then((response) => {
                fetchAllProducts()
                return response.data
            })
    }

    const fetchAllProducts = () => {
        axios.get("/supplier/products")
            .then((response) => response.data)
            .then((data) => setProducts(data))
    }

    return {products, addProduct}
}
