import {useEffect, useState} from "react";
import {Product} from "./Product";
import {NewProduct} from "./NewProduct";
import axios from "axios";

export default function useProducts() {

    const [products, setProducts] = useState<Product[]>([]);

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

    const getAllProducts = () =>{
        axios.get("/supplier/products")
            .then(response => {
                return response.data
            })
    }

    const editProduct = (product:Product)=>{
        axios.put("/supplier/products/" + product.id, product)
            .then((response) => response.data)
            .then((data)=>setProducts(data))
            .then(getAllProducts)
    }

    const deleteProduct = (id: string | undefined) => {
        return axios.delete(`/supplier/products/${id}`)
            .then(getAllProducts)
    }

    return {products, addProduct, getAllProducts, editProduct, deleteProduct}
}
