import React, {useState} from 'react';
import './App.css';
import ProductList from "./supplier/ProductList";
import useProducts from "./supplier/useProducts";
import {toast, ToastContainer} from "react-toastify";

function App() {

    const [message, setMessage] = useState();

    return (
        <>
            <HashRouter>
                <Header/>
                <main>
                    <AllRoutes/>
                    <h1>{message}</h1>

                    <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
                </main>
            </HashRouter>
        </>
    );
}

export default App;
