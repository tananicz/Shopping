import React from "react";

export default function useCart()
{
    const [cart, setCart] = React.useState([]);

    function addProduct(newProduct)
    {
        
    }

    function updateCart()
    {

    }

    return [cart, addProduct, updateCart];
}