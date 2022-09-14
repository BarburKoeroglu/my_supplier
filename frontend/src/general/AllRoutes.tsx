import useProducts from "../supplier/useProducts";
import ProductList from "../supplier/ProductList";
import React from "react";
import {Route, Routes} from "react-router-dom";
import ProductDetails from "../supplier/ProductDetails";
import OrderList from "../Order/OrderList";
import useOrders from "../Order/useOrders";
import AddNewOrderForm from "../Order/AddNewOrderForm";
import Home from "./Home";

export default function AllRoutes() {

    const productHook = useProducts();
    const orderHook = useOrders();

    return (
        <>
            <Routes>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/supplier/products"} element={<ProductList products={productHook.products}
                                                                         addProduct={productHook.addProduct}/>}/>
                <Route path={"/supplier/products/:productId"} element={<ProductDetails products={productHook.products}
                                                                                       fetchAllProducts={productHook.fetchAllProducts}
                                                                                       editProduct={productHook.editProduct}
                                                                                       deleteProduct={productHook.deleteProduct}/>}/>
                <Route path={"/customer/orders"} element={<OrderList orders={orderHook.orders}
                                                                     addOrder={orderHook.addOrder}/>}/>
                <Route path={"/customer/orders/newOrder"}
                       element={<AddNewOrderForm addNewOrder={orderHook.addOrder}/>}/>
            </Routes>
        </>
    )
}
