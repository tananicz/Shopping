import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ItemDetails.css"

export default function ItemDetails(props)
{
    const id = Number(useParams().id);
    const [itemData, setItemData] = useState({});
    const addToCart = props.addToCart;
    const cart = props.cart;

    let outputJSX = <div className="loadingAnimationDiv"><img src="/loading.gif" alt="Loading animation" /></div>
    if (Number.isInteger(itemData.id))
    {
        outputJSX = <>
            <div>
                <span className="itemName">{itemData.title}</span>
            </div>
            <div>
                <img className="itemImage" src={itemData.image} alt={itemData.title} />
            </div>
            <div>
                <span className="itemDetailsCategory">Category: <strong>{itemData.category}</strong></span>
            </div>
            <div className="itemDescription">
                {itemData.description}
            </div>
            <div className="ratingsDiv">
                Rating: <span className="rating">{itemData.rating.rate}</span> (per <span className="votes">{itemData.rating.count}</span> votes)
            </div>
            <div>
                <span className="itemPrice">${itemData.price}</span>
            </div>
        </>
    }
    else if (itemData.errorMsg)
    {
        outputJSX = <span className="info">{itemData.errorMsg}</span>
    }

    let itemsInCart = 0;
    if (cart.length > 0)
        itemsInCart = cart.reduce((accumulator, currentVal) => accumulator + currentVal.quantity, 0);

    React.useEffect(() => {
        let ignore = !Number.isInteger(id);

        async function fetchProper()
        {
            const itemAPIUrl = "https://fakestoreapi.com/products/" + id;

            try
            {
                const resp = await fetch(itemAPIUrl);
                const data = await resp.json();

                if (!ignore)
                    setItemData(data);
                
            }
            catch (err)
            {
                setItemData({ errorMsg: "No item matching given id" });
            }
        }
    
        if (!ignore)
            fetchProper();
        else
            setItemData({ errorMsg: "No item matching given id" });

        return () => { 
            ignore = true;
        };
    }, [id]);

    return (
        <div className="detailsWrapper">
            <div className="itemDetailsDiv">
                {outputJSX}
            </div>
            <div className="buttonsDiv">
                <Link to="/"><button className="return">Return to shop</button></Link>
                {Number.isInteger(itemData.id) && 
                    <div className="addToCartSection">
                        <button className="add" onClick={() => { addToCart(itemData); }}>Add to cart</button>
                        {itemsInCart > 0 && <p className="cartStats">{itemsInCart} item{itemsInCart === 1 ? "" : "s"} already added</p>}
                    </div>
                }
            </div>
        </div>
    );
}