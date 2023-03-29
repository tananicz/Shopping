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
            const updatedOrder = JSON.parse(JSON.stringify(prevOrder));

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

        const validateMsg = validateInput();
        if (validateMsg === "")
        {
            setOrder(prevOrder => {
                const confirmedOrder = { ...prevOrder };
                confirmedOrder.confirmed = true;
                return confirmedOrder;
            });
        }
        else
        {
            const errMsgDiv = document.getElementById("errMsg");
            errMsgDiv.innerText = validateMsg;
            errMsgDiv.style.display = "block";
        }
    }

    function validateInput()
    {
        let invalidFields = [];

        if (!(userData.firstName.length > 0)) 
            invalidFields.push("'First name'");

        if (!(userData.surname.length > 0)) 
            invalidFields.push("'Surname'");

        if (!(userData.address.street.length > 0)) 
            invalidFields.push("'Street'");

        if (!(userData.address.postalCode.match(/^[0-9]{2}-[0-9]{3}$/))) 
            invalidFields.push("'Postal code'");

        if (!(userData.address.city.length > 0)) 
            invalidFields.push("'City'");

        if (!(userData.phone.length > 0)) 
            invalidFields.push("'Phone'");

        if (!userData.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) 
            invalidFields.push("'E-mail'");

        let errMessage = "";
        if (invalidFields.length > 0)
        {
            const fieldsStr = invalidFields.reduce((errStr, field) => errStr = errStr + field + ", ", "");
            errMessage = `${fieldsStr.substring(0, fieldsStr.length - 2)} field${invalidFields.length > 1 ? "s" : ""} ${invalidFields.length > 1 ? "are" : "is"} invalid`;
        }

        return errMessage;
    }

    return (
        <form onSubmit={(e) => confirmOrder(e)} id="orderForm">
            <div className="addressArea">
                <div className="addressAreaTitle">Please provide your data</div>
                <div id="errMsg"></div>
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