import React from "react";
import "./Logout.css"

export default function Logout(props)
{
    return (
        <div className="logoutComponent">
            <span>Hello <strong>{props.userName}</strong>,<br/>You have some items in basket...</span>
            <button onClick={() => props.setToken("")}>Logout</button>
        </div>
    );
}