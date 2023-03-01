import React from "react";

export default function useSessionToken()
{
    const sessionStorageToken = sessionStorage.getItem("token");
    const [token, setToken] = React.useState(sessionStorageToken ? JSON.parse(sessionStorageToken) : {});

    function setSessionToken(newToken)
    {
        const newTokenValid = newToken?.clientId && newToken?.firstName && newToken?.surname && newToken?.tokenStr;
        sessionStorage.setItem("token", newTokenValid ? JSON.stringify(newToken) : "");
        setToken(newTokenValid ? newToken : {});
    }

    return [token, setSessionToken];
}