import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import useSessionToken from "../../hooks/useSessionToken"
import useCart from "../../hooks/useCart"
import Header from "../Header/Header";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import Checkout from "../Checkout/Checkout";
import "./App.css"

export default function App()
{
    const [cart, cartOperations] = useCart();
    const [token, setToken] = useSessionToken();
    const userName = token.firstName ?? "";

    console.log("cart:", cart);

    return (
        <div className="appContainer">
            <Header userName={userName} setToken={setToken} cart={cart} />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Shop addToCart={cartOperations.add} />} />
                    <Route exact path="/shop" element={<Shop addToCart={cartOperations.add} />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/checkout" element={token.tokenStr ? <Checkout /> : <Login setToken={setToken} />} />
                    <Route exact path="/login" element={token.tokenStr ? <Navigate to="/" /> : <Login setToken={setToken} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}