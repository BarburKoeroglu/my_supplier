import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Header(){
    const [linkButton, setLinkButton] = useState("Home");
    useEffect(()=>{
        document.title = linkButton;
    })

    return(
        <header>
            <h1>mySupplier</h1>
            <nav className={"menu"}>
                <NavLink className={"nav"} onClick={()=>setLinkButton("Home")} to={"/home"}>Home</NavLink>
                <NavLink className={"nav"} onClick={()=>setLinkButton("Produktliste")} to={'/supplier/products'}>Produktliste</NavLink>
            </nav>
        </header>
    )
}
