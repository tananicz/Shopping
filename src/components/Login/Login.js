import React from "react";
import "./Login.css";

export default function Login(props)
{
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    function showError()
    {
        const label = document.getElementById("errorLabel");
        label.style.display = "inline";
        label.innerText = "Invalid credentials";
    }
    
    function handleSubmit(event)
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

        fetch("http://localhost:8080/login", xhrParams)
            .then(res => {
                res.json()
                    .then(data => {
                        if (data?.token && data?.firstName && data?.surname)
                            props.setToken(JSON.stringify(data));
                        else
                            showError();
                    })
                    .catch(e => {
                        showError()
                    })
            })
            .catch(e => {
                showError()
            });
    }

    function handleChange(event)
    {
        if (event.target.id === "login")
        {
            setLogin(event.target.value);
        }
        else if (event.target.id === "password")
        {
            setPassword(event.target.value);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="loginForm">
            <h2>Please provide login & password</h2>
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