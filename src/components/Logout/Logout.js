import React from "react";
import "./Logout.css"

export default function Logout(props)
{
    return (
        <div className="logoutComponent">
            <span>Welcome to our shop <strong>{props.userName}</strong></span>
            <button onClick={() => props.setUserData("")}>Logout</button>
        </div>
    );
}