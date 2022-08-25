import {useEffect, useState} from "react";
import {ProductType} from "./ProductType";
import {NewProduct} from "./NewProduct";
import axios from "axios";

export default function useProducts() {

    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {fetchAllProducts()},[]);

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

    const getProductByItemNumber = (itemNumber:string | undefined) =>{
        return products.find(thisProduct =>{
            return thisProduct.itemNumber === itemNumber
        })
    }

    return {products, addProduct, getProductByItemNumber}
}
