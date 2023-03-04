import React from "react";
import "./CheckoutOrderDetails.css"

export default function CheckoutOrderDetails(props)
{
    const setOrder = props.setOrder;
    const userData = props.order.userData;
    const totalCart = props.order.itemsArr.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
    const shipmentCost = props.shipments.filter(shipment => shipment.id === props.order.shipmentId)[0].price;

    const shipmentsJSX = props.shipments.map(shipment => {
        return (
            <div className="shipmentOption" key={shipment.id}>
                <input onChange={(e) => updateShipment(e)} type="radio" id={`shipment${shipment.id}`} name="shipment" value={shipment.id} checked={props.order.shipmentId === shipment.id ? true : false} />
                <label htmlFor="tradPost">{`${shipment.name} $${shipment.price}`} </label>
            </div>
        );
    });

    function updateUserData(e)
    {
        const propName = e.target.id;
        const propValue = e.target.value;

        setOrder(prevOrder => {
            const updatedOrder = { ...prevOrder };

            if (propName.match("street|postalCode|city"))
                updatedOrder.userData.address[propName] = propValue;
            else
                updatedOrder.userData[propName] = propValue;

            return updatedOrder;
        });
    }

    function updateShipment(e)
    {
        setOrder(prevOrder => {
            const updatedOrder = { ...prevOrder };
            updatedOrder.shipmentId = Number(e.target.value);
            return updatedOrder;
        });
    }

    function confirmOrder(e)
    {
        e.preventDefault();
        setOrder(prevOrder => {
            const confirmedOrder = { ...prevOrder };
            confirmedOrder.confirmed = true;
            return confirmedOrder;
        });
    }

    return (
        <form onSubmit={(e) => confirmOrder(e)} id="orderForm">
            <div className="addressArea">
                <div className="addressAreaTitle">Please provide your data</div>
                <div className="inputArea">
                    <label htmlFor="firstName">First name: </label>
                    <input onChange={(e) => updateUserData(e)} value={userData.firstName} id="firstName" />
                </div>
                <div className="inputArea">
                    <label htmlFor="surname">Surname: </label>
                    <input onChange={(e) => updateUserData(e)} value={userData.surname} id="surname" />
                </div>
                <div className="inputArea">
                    <label htmlFor="street">Street: </label>
                    <input onChange={(e) => updateUserData(e)} value={userData.address.street} id="street" />
                </div>
                <div className="inputArea">
                    <label htmlFor="postalCode">Postal code: </label>
                    <input onChange={(e) => updateUserData(e)} value={userData.address.postalCode} id="postalCode" />
                </div>
                <div className="inputArea">
                    <label htmlFor="city">City: </label>
                    <input onChange={(e) => updateUserData(e)} value={userData.address.city} id="city" />
                </div>
                <div className="inputArea">
                    <label htmlFor="phone">Phone: </label>
                    <input onChange={(e) => updateUserData(e)} value={userData.phone} id="phone" />
                </div>
                <div className="inputArea">
                    <label htmlFor="email">e-mail: </label>
                    <input onChange={(e) => updateUserData(e)} value={userData.email} id="email" />
                </div>
            </div>
            <div className="shipmentArea">
                <div className="shipmentAreaTitle">Please choose shipment</div>
                {shipmentsJSX}
                <div id="totalWithShipment">
                    <p>Total cost (with shipment): <strong>${(Number(totalCart) + Number(shipmentCost)).toFixed(2)}</strong></p>
                </div>
            </div>
        </form>
    );
}