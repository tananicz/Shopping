import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import useSessionToken from "../../hooks/useSessionToken"
import Header from "../Header/Header";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import "./App.css"

export default function App()
{
    const [token, setToken] = useSessionToken();
    const userName = token.firstName ?? "";

    return (
        <div className="appContainer">
            <Header userName={userName} setToken={setToken} />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Shop />} />
                    <Route exact path="/shop" element={<Shop />} />
                    <Route exact path="/cart" element={token.tokenStr ? <Cart /> : <Login setToken={setToken} />} />
                    <Route exact path="/login" element={token.tokenStr ? <Navigate to="/" /> : <Login setToken={setToken} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}