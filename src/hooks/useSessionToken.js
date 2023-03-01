import React from "react";

export default function useSessionToken()
{
    const sessionLoginToken = sessionStorage.getItem("loginToken");
    const [token, setToken] = React.useState(sessionLoginToken === null ? "" : sessionLoginToken);

    function setSessionToken(newToken)
    {
        sessionStorage.setItem("loginToken", newToken);
        setToken(newToken);
    }

    return [token, setSessionToken];
}