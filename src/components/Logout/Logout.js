import React from "react";

export default function Logout(props)
{
    return (
        <div>
            <span>Hello <strong>{props.userName}</strong></span>
            <button onClick={() => props.setToken("")}>Logout</button>
        </div>
    );
}