import React from "react";
import "./ThankYouScreen.css"

export default function ThankYouScreen(props)
{
    return (
        <div className="thankYouDiv">
            <div>
                Thank you for purchasing products in our shop {props.userName}<br/>
                We'll send you your items ASAP
            </div>
            <a href="/"><button>Return to shop</button></a>
        </div>
    );
}