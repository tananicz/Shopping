import React from "react";
import CartItem from "../CartItem/CartItem";
import "./Cart.css"

export default function Cart(props)
{
    const cartItems = props.cart.length > 0 ? 
        props.cart.map(item => (<CartItem  key={item.id} item={item} operations={props.cartOperations} />)) : <div className="cartInfo">Your cart is empty</div>;
    const totalSum = props.cart.reduce((partialSum, item) => partialSum + item.quantity * item.price, 0).toFixed(2);

    return (
        <div className="cartContainer">
            <div className="title">Contents of your cart:</div>
            <div className="cart">
                {cartItems}
            </div>
            {props.cart.length > 0 && 
                <div className="summary">
                    <div>
                        Total: <strong>${totalSum}</strong>
                    </div>
                </div>}
            <div className="buttons">
                <div>
                    <a href="/"><button className="continue">Continue shopping</button></a>
                    {props.cart.length > 0 && <a href="/checkout"><button className="checkout">Checkout</button></a>}
                </div>
            </div>
        </div>
    );
}