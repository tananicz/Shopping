import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import useSessionUser from "../../hooks/useSessionUser"
import useCart from "../../hooks/useCart"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import Checkout from "../Checkout/Checkout";
import "./App.css"

export default function App()
{
    const [cart, cartOperations] = useCart();
    const [userData, setUserData] = useSessionUser();
    const userName = userData.firstName ?? "";

    let checkoutTarget;
    if (userData.tokenStr && cart.cartArr.length > 0)
        checkoutTarget = <Checkout cart={cart} operations={cartOperations} userData={userData} />;
    else if (!userData.tokenStr && cart.cartArr.length > 0)
        checkoutTarget = <Login title="Please provide your credentials to continue" setUserData={setUserData} />;
    else
        checkoutTarget = <Navigate to="/cart" />;

    return (
        <div className="appContainer">
            <Header userName={userName} setUserData={setUserData} cart={cart.cartArr} />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Shop addToCart={cartOperations.add} />} />
                    <Route exact path="/shop" element={<Shop addToCart={cartOperations.add} />} />
                    <Route exact path="/cart" element={<Cart cart={cart.cartArr} cartOperations={cartOperations} />} />
                    <Route exact path="/checkout" element={checkoutTarget} />
                    <Route exact path="/login" element={userData.tokenStr ? <Navigate to="/" /> : <Login setUserData={setUserData} />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}