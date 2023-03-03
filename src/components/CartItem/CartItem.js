import React from "react";
import "./CartItem.css"

export default function CartItem(props)
{
    const item = props.item;
    const operations = props.operations;

    function decreaseQuantity(item)
    {
        if (item.quantity === 1)
            operations.delete(item);
        else
        {
            item.quantity--;
            operations.update(item);
        }
    }

    function increaseQuantity(item)
    {
        item.quantity++;
        operations.update(item);
    }

    return (
        <div className="cartItem">
            <div className="imgContainer">
                <img src={item.image} alt="" />
            </div>
            <div className="itemInfo">
                <div>
                    <p className="itemTitle">{item.title}</p>
                    <p className="itemCategory">{item.category}</p>
                    <p className="itemPrice">${item.price}</p>
                </div>
            </div>
            <div className="alterQuantity">
                <p className="incrDecrButtons">
                    <button onClick={() => decreaseQuantity(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item)}>+</button>
                </p>
                <button className="deleteBtn" onClick={() => operations.delete(item)}>Delete item</button>
            </div>
        </div>
    );
}