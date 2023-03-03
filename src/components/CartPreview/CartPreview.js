import React from "react";
import "./CartPreview.css"

export default function CartPreview(props)
{
    const itemCount = props.cart.length;

    return (
        <div className="cartPreview">
            <div className="iconContainer"><a href="/cart"><img className="cartIcon" src="cart_icon.png" /></a></div>
            <div>You have <strong>{itemCount} item{ itemCount > 1 && "s"}</strong> in your cart</div>
        </div>
    );
}