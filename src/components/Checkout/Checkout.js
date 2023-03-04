import React from "react";
import "./Checkout.css"

export default function Checkout(props)
{
    const itemsArr = props.cart.cartArr;
    const totalPrice = itemsArr.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);

    let i = 0;
    const tbodyJSX = itemsArr.map(item => {
        i++;
        return (
            <tr>
                <td>{i}</td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
            </tr>
        );
    });

    return (
        <div className="checkoutContainer">
            <div className="title">Summary:</div>
            <div className="tableContainer">
                <table className="itemsTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbodyJSX}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4">
                                Total: <strong>{totalPrice}</strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="buttons">
                <div>
                    <a href="/cart"><button className="return">Return to cart</button></a>
                    <a href="#"><button className="confirm">Confirm order</button></a>
                </div>
            </div>
        </div>
    );
}