import React from "react";
import Logout from "../Logout/Logout";
import "./Header.css"

export default function Header(props)
{
    return (
        <header className="appHeader">
            <div>
                <h1>This is the main header app - maybe put some header here</h1>
            </div>
            {props.userName && <Logout userName={props.userName} setToken={props.setToken} />}
        </header>
    );
}