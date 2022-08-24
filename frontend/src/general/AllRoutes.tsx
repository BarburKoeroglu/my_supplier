import useProducts from "../supplier/useProducts";
import ProductList from "../supplier/ProductList";
import React from "react";
import {Route, Routes} from "react-router-dom";


export default function AllRoutes(){

    const productHook = useProducts();

    return(
        <>
        <Routes>
            <Route path={"/supplier/products"} element={<ProductList products={productHook.products}
                                                                     addProduct={productHook.addProduct}/>}/>
        </Routes>
        </>
    )
}
