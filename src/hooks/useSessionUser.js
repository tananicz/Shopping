import React from "react";

export default function useSessionUser()
{
    const sessionStorageData = sessionStorage.getItem("userData");
    const [data, setData] = React.useState(sessionStorageData ? JSON.parse(sessionStorageData) : {});

    function setSessionData(newData)
    {
        const newDataValid = newData?.clientId && newData?.firstName && newData?.surname && newData?.tokenStr;
        sessionStorage.setItem("userData", newDataValid ? JSON.stringify(newData) : "");
        setData(newDataValid ? newData : {});
    }

    return [data, setSessionData];
}