import React from "react";

export default function useCart()
{
    const storageCart = sessionStorage.getItem("cart");
    const cartArr = storageCart ? JSON.parse(storageCart) : [];
    const [cart, setCart] = React.useState(cartArr);
      
    function setSessionCart(deleg)
    {
        setCart(prevCart => {
            const newCart = deleg(prevCart);
            sessionStorage.setItem("cart", JSON.stringify(newCart));
            return newCart;
        });
    }

    function addItem(newProduct)
    {
        if (!cart.map(item => item.id).includes(newProduct.id))
        {
            setSessionCart(prevCart => [].concat(prevCart).concat(newProduct));
        }
    }

    function updateItem(itemToUpdate)
    {
        if (cart.map(item => item.id).includes(itemToUpdate.id))
        {
            setSessionCart(prevCart => {
                const index = prevCart.map(item => item.id).indexOf(itemToUpdate.id);
                const updatedCart = [].concat(prevCart);
                updatedCart[index] = itemToUpdate;
                return updatedCart;
            });
        }
    }

    function deleteItem(itemToDelete)
    {
        console.log("aaa");
        if (cart.map(item => item.id).includes(itemToDelete.id))
        {
            setSessionCart(prevCart => {
                const index = prevCart.map(item => item.id).indexOf(itemToDelete.id);
                const modifiedCart = [].concat(prevCart);
                modifiedCart.splice(index, 1);
                return modifiedCart;
            });
        }
    }

    const cartOperations = {
        "add": addItem,
        "update": updateItem,
        "delete": deleteItem
    };

    return [cart, cartOperations];
}