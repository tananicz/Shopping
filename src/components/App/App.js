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
import ThankYouScreen from "../ThankYouScreen/ThankYouScreen";
import "./App.css"

export default function App()
{
    const [cart, cartOperations] = useCart();
    const [userData, setUserData] = useSessionUser();
    const userName = userData.firstName ?? "";

    let loginTarget;
    if (userData.tokenStr)
    {
        const qs = window.location.search;
        let returnUrl;
        if (qs.includes("returnUrl="))
            returnUrl = qs.split("returnUrl=")[1].split("&")[0];
        else
            returnUrl = "/";

        loginTarget = <Navigate to={returnUrl} />;
    }
    else
        loginTarget = <Login setUserData={setUserData} />;

    let checkoutTarget;
    if (cart.orderConfirmed)
        checkoutTarget = <ThankYouScreen userName={userName} />;
    else
    {
        if (userData.tokenStr && cart.cartArr.length > 0)
            checkoutTarget = <Checkout cart={cart} cartOperations={cartOperations} userData={userData} />;
        else if (!userData.tokenStr && cart.cartArr.length > 0)
            checkoutTarget = <Login title="Please provide your credentials to continue to checkout" setUserData={setUserData} />;
        else
            checkoutTarget = <Navigate to="/cart" />;
    }

    return (
        <div className="appContainer">
            <Header userData={userData} setUserData={setUserData} cart={cart.cartArr} />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Shop cart={cart.cartArr} addToCart={cartOperations.add} />} />
                    <Route exact path="/cart" element={<Cart cart={cart.cartArr} cartOperations={cartOperations} />} />
                    <Route exact path="/checkout" element={checkoutTarget} />
                    <Route exact path="/login" element={loginTarget} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}