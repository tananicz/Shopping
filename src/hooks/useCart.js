import React from "react";

export default function useCart()
{
    const [cart, setCart] = React.useState([]);

    function addItem(newProduct)
    {
        if (!cart.map(item => item.id).includes(newProduct.id))
        {
            setCart(prevCart => [].concat(prevCart).concat(newProduct));
        }
    }

    function updateItem(itemToUpdate)
    {
        if (cart.map(item => item.id).includes(itemToUpdate.id))
        {
            setCart(prevCart => {
                const index = prevCart.map(item => item.id).indexOf(itemToUpdate.id);
                const updatedCart = [].concat(prevCart);
                updatedCart[index] = itemToUpdate;
                return updatedCart;
            });
        }
    }

    function deleteItem(itemToDelete)
    {
        if (cart.map(item => item.id).includes(itemToDelete.id))
        {
            setCart(prevCart => {
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