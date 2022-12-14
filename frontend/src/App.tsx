import React from 'react';
import './App.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {HashRouter} from "react-router-dom";
import AllRoutes from "./general/AllRoutes";
import Header from "./general/Header";

function App() {

    return (
        <>
            <HashRouter>
                <Header/>
                <main>
                    <AllRoutes/>
                </main>
            </HashRouter>
            <ToastContainer className={"toastContainer"} position={toast.POSITION.TOP_RIGHT}/>
        </>
    );
}

export default App;
