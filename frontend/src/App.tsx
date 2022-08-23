import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import ProductList from "./supplier/ProductList";
import useProducts from "./supplier/useProducts";


function App() {
    const productHook = useProducts();
    const [message, setMessage] = useState();

    axios.get("/supplier/products")
        .then((response => response.data))
        .then(setMessage)

    return (
        <>
            <h1>{message}</h1>
            <ProductList products={productHook.products} addProduct={productHook.addProduct}/>
        </>
    );
}

export default App;
