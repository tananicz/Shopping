import React from "react";
import LoginWidget from "../Logout/LoginWidget";
import CartPreview from "../CartPreview/CartPreview";
import "./Header.css"

export default function Header(props)
{
    return (
        <header className="appHeader">
            <div>
                <a href="/"><img src="shop_logo.jpg" alt="Shop logo" className="shopLogo" /></a>
            </div>
            <div className="pageTitle">
                <a href="/"><h1>ACME Shop</h1></a>
            </div>
            <div className="previewContainer">
                <LoginWidget userName={props.userName} setUserData={props.setUserData} />
                {props.cart.length > 0 && <CartPreview cart={props.cart} />}
            </div>
        </header>
    );
}