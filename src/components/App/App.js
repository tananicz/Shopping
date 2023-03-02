import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import useSessionToken from "../../hooks/useSessionToken"
import Header from "../Header/Header";
import Shop from "../Shop/Shop";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import Checkout from "../Checkout/Checkout";
import "./App.css"

export default function App()
{
    const [products, setProducts] = React.useState([]);
    const [token, setToken] = useSessionToken();
    const userName = token.firstName ?? "";

    React.useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
                .then(data => setProducts(data));
    }, []);

    return (
        <div className="appContainer">
            <Header userName={userName} setToken={setToken} />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Shop products={products} />} />
                    <Route exact path="/shop" element={<Shop products={products} />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/checkout" element={token.tokenStr ? <Checkout /> : <Login setToken={setToken} />} />
                    <Route exact path="/login" element={token.tokenStr ? <Navigate to="/" /> : <Login setToken={setToken} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}