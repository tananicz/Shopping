import React from "react";
import "./Login.css";

export default function Login(props)
{
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const title = props.title || "Please provide login & password";

    function showError()
    {
        const label = document.getElementById("errorLabel");
        label.style.display = "inline";
        label.innerText = "Invalid credentials";
    }
    
    async function handleSubmit(event)
    {
        event.preventDefault();

        const xhrParams = {
            method: "POST",
            body: JSON.stringify({
                login: login,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try
        {
            const response = await fetch("http://localhost:8080/login", xhrParams);
            const data = await response.json();

            if (data?.clientId && data?.firstName && data?.surname && data?.tokenStr)
                props.setUserData(data);
        }
        catch (e)
        {
            showError();
        }
    }

    function handleChange(event)
    {
        if (event.target.id === "login")
            setLogin(event.target.value);
        else if (event.target.id === "password")
            setPassword(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="loginForm">
                <h2>{title}</h2>
                <label id="errorLabel"></label>
                <label htmlFor="login">Login</label>
                <input type="text" value={login} onChange={handleChange} id="login" />
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={handleChange} id="password" />
                <button>Submit</button>
            </form>
        </div>
    );
}