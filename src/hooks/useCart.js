import React from "react";

export default function useCart()
{
    const storageCart = sessionStorage.getItem("cart");
    const cartObj = storageCart ? JSON.parse(storageCart) : { cartArr: [], orderConfirmed: false };
    const [cart, setCart] = React.useState(cartObj);
      
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
        if (!cart.cartArr.map(item => item.id).includes(newProduct.id))
        {
            setSessionCart(prevCart => {
                return {
                    ...prevCart,
                    cartArr: [].concat(prevCart.cartArr).concat(newProduct)
                };
            });
        }
    }

    function updateItem(itemToUpdate)
    {
        if (cart.cartArr.map(item => item.id).includes(itemToUpdate.id))
        {
            setSessionCart(prevCart => {
                const index = prevCart.cartArr.map(item => item.id).indexOf(itemToUpdate.id);
                const updatedCart = {
                    ...prevCart
                };
                updatedCart.cartArr[index] = itemToUpdate;
                return updatedCart;
            });
        }
    }

    function deleteItem(itemToDelete)
    {
        if (cart.cartArr.map(item => item.id).includes(itemToDelete.id))
        {
            setSessionCart(prevCart => {
                const index = prevCart.cartArr.map(item => item.id).indexOf(itemToDelete.id);
                const modifiedCart = {
                    ...prevCart
                };
                modifiedCart.cartArr.splice(index, 1);
                return modifiedCart;
            });
        }
    }

    function setOrderConfirmed(value)
    {
        setSessionCart(prevCart => {
            const updatedCart = {
                ...prevCart,
                orderConfirmed: value
            };
            return updatedCart;
        });
    }

    const cartOperations = {
        "add": addItem,
        "update": updateItem,
        "delete": deleteItem,
        "setOrderConfirmed": setOrderConfirmed
    };

    return [cart, cartOperations];
}