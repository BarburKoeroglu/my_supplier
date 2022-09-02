import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import "./Header.css";

export default function Header() {
    const [linkButton, setLinkButton] = useState("Home");
    useEffect(() => {
        document.title = linkButton;
    })

    return (
        <header>
            <div>
                <img className={"logo"} src="../img.png" alt={"logo"}/>
                <h1><span>my</span>Supplier</h1>
            </div>
            <nav className={"menu"}>
                <NavLink className={"nav"} onClick={() => setLinkButton("Home")} to={"/home"}>HOME</NavLink>
                <NavLink className={"nav"} onClick={() => setLinkButton("Produktliste")} to={'/supplier/products'}>PRODUKTLISTE</NavLink>
            </nav>
        </header>
    )
}
