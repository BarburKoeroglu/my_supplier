import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {tab} from "@testing-library/user-event/dist/tab";


export default function Header(){
    const [linkButton, setLinkButton] = useState("Home");
    useEffect(()=>{
        document.title = tab;
    })

    return(
        <header>
            <h1>mySupplier</h1>
            <nav className={"menu"}>
                <NavLink className={"nav"} onClick={()=>setLinkButton("Home")} to={"/supplier"}></NavLink>
                <NavLink className={"nav"} onClick={()=>setLinkButton("Produktliste")} to={'/supplier/products'}></NavLink>
            </nav>
        </header>
    )
}
