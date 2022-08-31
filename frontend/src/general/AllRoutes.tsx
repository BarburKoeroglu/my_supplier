import useProducts from "../supplier/useProducts";
import ProductList from "../supplier/ProductList";
import React from "react";
import {Route, Routes} from "react-router-dom";
import ProductDetails from "../supplier/ProductDetails";


export default function AllRoutes(){

    const productHook = useProducts();

    return(
        <>
        <Routes>
            <Route path={"/supplier/products"} element={<ProductList products={productHook.products}
                                                                     addProduct={productHook.addProduct}/>}/>
            <Route path={"/supplier/products/:id"} element={<ProductDetails products={productHook.products}
                                                                            getAllProducts={productHook.getAllProducts}
                                                                            editProduct={productHook.editProduct}
                                                                            deleteProduct={productHook.deleteProduct}/>}/>
        </Routes>
        </>
    )
}
