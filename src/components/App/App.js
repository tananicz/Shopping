import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import useSessionToken from "../../hooks/useSessionToken"
import Header from "../Header/Header";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";

export default function App()
{
    const [token, setToken] = useSessionToken();
    let userName = token ? JSON.parse(token).firstName : "";

    return (
        <div className="appContainer">
            <Header userName={userName} setToken={setToken} />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Shop />} />
                    <Route exact path="/shop" element={<Shop />} />
                    <Route exact path="/cart" element={token === "" ? <Login setToken={setToken} /> : <Cart />} />
                    <Route exact path="/login" element={token === "" ? <Login setToken={setToken} /> : <Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}