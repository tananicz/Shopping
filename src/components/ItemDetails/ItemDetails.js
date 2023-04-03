import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemDetails.css"

export async function itemLoader({ params })
{
    const id = params.id;
    
}

export default function ItemDetails()
{
    const id = Number(useParams().id);
    const [itemData, setItemData] = useState({});

    React.useEffect(() => {
        const itemAPIUrl = "https://fakestoreapi.com/products/" + id;

        async function fetchProper()
        {
            const resp = await fetch(itemAPIUrl);
            const data = await resp.json();
            setItemData(data);
        }
    
        fetchProper();
    }, []);

    return (
        <>
            <h4>Hello!</h4>
            <p>
                {JSON.stringify(itemData)}
            </p>
        </>
    );
}