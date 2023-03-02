import React from "react";
import Logout from "../Logout/Logout";
import "./Header.css"

export default function Header(props)
{
    return (
        <header className="appHeader">
            <div>
                <img src="shop_logo.jpg" alt="Shop logo" className="shopLogo" />
            </div>
            <div className="pageTitle">
                <h1>ACME Shop</h1>
            </div>
            {props.userName && <Logout userName={props.userName} setToken={props.setToken} />}
        </header>
    );
}