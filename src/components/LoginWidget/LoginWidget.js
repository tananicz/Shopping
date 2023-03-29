import React from "react";
import "./LoginWidget.css"

export default function LoginWidget(props)
{
    let widgetJSX;

    if (!props.userData.tokenStr)
    {
        const returnUrl = window.location.pathname === "/login" ? "/" : window.location.pathname;
        widgetJSX = <div className="loginPreviewComponent">
                        <a href={"/login?returnUrl=" + returnUrl}><button>Login</button></a>
                    </div>;
    }
    else
    {
        widgetJSX = <div className="loginPreviewComponent">
                        <span>Welcome to our shop <strong>{props.userData.firstName}</strong></span>
                        <button onClick={() => props.setUserData("")}>Logout</button>
                    </div>;
    }

    return widgetJSX;
}