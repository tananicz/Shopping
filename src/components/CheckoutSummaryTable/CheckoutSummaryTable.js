import React from "react";
import "./CheckoutSummaryTable.css"

export default function CheckoutSummaryTable(props)
{   
    const totalPrice = props.itemsArr.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
    
    let i = 0;
    const tbodyJSX = props.itemsArr.map(item => {
        i++;
        return (
            <tr key={i}>
                <td>{i}</td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
            </tr>
        );
    });

    return (
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
                    <td colSpan="4">
                        Total: <strong>{totalPrice}</strong>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}