import {useEffect, useState} from "react";
import {Product} from "./Product";
import {NewProduct} from "./NewProduct";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function useProducts() {

    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
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

        const editProduct = (product:Product)=>{
        axios.put("/supplier/products/" + product.id, product)
            .then((response) => response.data)
            .then(() => navigate("/supplier/products/" + product.id))
            .then(fetchAllProducts)


    }

    const deleteProduct = (id: string | undefined) => {
        return axios.delete(`/supplier/products/${id}`)
            .then(() => navigate("/supplier/products"))
            .then(fetchAllProducts)
    }

    return {products, addProduct, fetchAllProducts, editProduct, deleteProduct}
}
