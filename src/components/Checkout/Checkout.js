import React from "react";
import CheckoutSummaryTable from "../CheckoutSummaryTable/CheckoutSummaryTable";
import CheckoutOrderDetails from "../CheckoutOrderDetails/CheckoutOrderDetails";
import "./Checkout.css"

export default function Checkout(props)
{
    const shipments = [
        {
            id: 1,
            name: "Traditional Post",
            price: 2.99
        },
        {
            id: 2,
            name: "Courier Company",
            price: 3.49
        },
        {
            id: 3,
            name: "Parcel locker",
            price: 3.99
        }
    ];

    const [order, setOrder] = React.useState({
        userData: props.userData,
        shipmentId: 1,
        itemsArr: props.cart.cartArr.map(item => {
            return {
                id: item.id,
                quantity: item.quantity,
                price: item.price
            };
        }),
        confirmed: false
    });

    if (order.confirmed)
    {
        //as we're in charge of order state, here we can send some xhr requests 
        //to the database to save the order and decrease quantity of available products etc.
    }

    React.useEffect(() => { 
        if (order.confirmed) 
            props.cartOperations.deleteAfterPurchase();
    }, [order.confirmed, props.cartOperations]);

    return (
        <div className="checkoutContainer">
            <div className="title">Summary:</div>
            <div className="tableContainer">
                <CheckoutSummaryTable itemsArr={props.cart.cartArr} />
            </div>
            <div className="orderDetails">
                <CheckoutOrderDetails shipments={shipments} order={order} setOrder={setOrder} />
            </div>
            <div className="buttons">
                <div>
                    <a href="/cart"><button className="return">Return to cart</button></a>
                    <button className="confirm" form="orderForm">Confirm order</button>
                </div>
            </div>
        </div>
    );
}