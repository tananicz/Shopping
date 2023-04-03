import React from "react";
import "./ItemDetailsModal.css"
import { capitalize } from "../../helpers.js"

export default function ItemDetailsModal(props)
{
    const [itemData, setItemData] = React.useState({});
    const itemDetailsAPIUrl = "https://fakestoreapi.com/products/" + props.productId;

    let detailsJSX = <div className="loading"><img src="loading.gif" alt="loading animation" /></div>;
    if (itemData.id)
    {
        detailsJSX = <>
            <div className="itemTitle">{itemData.title}</div>
            <div className="imageWrap">
                <p className="itemImage"><img src={itemData.image} alt={itemData.title} /></p>
            </div>
            <div className="itemCategory">Category: {capitalize(itemData.category)}</div>
            <div className="itemDescription">
                <p className="descriptionLabel">Description:</p>
                <p className="descriptionText">{itemData.description}</p>
            </div>
            <div className="itemRating">
                Rating: <span className="ratingVal">{itemData.rating.rate}</span> (per <span className="ratingCount">{itemData.rating.count}</span> votes)
            </div>
            <div className="itemPrice">${itemData.price}</div>
        </>;
    }

    function handleCloseDialog()
    {
        props.setOpts(prevOpts => {
            return {
                ...prevOpts,
                selectedProduct: -1
            };
        });
    }

    React.useEffect(() => {
        document.querySelector(".itemDetailsDialog").showModal();
        let ignore = false;

        async function fetchData()
        {
            const resp = await fetch(itemDetailsAPIUrl);
            const data = await resp.json();

            if (!ignore)
                setItemData(data);
        }

        fetchData();

        return () => { 
            ignore = true 
        };
    }, [itemDetailsAPIUrl]);

    return (
        <dialog className="itemDetailsDialog" onClose={handleCloseDialog}>
            <div className="itemDetailsDiv">
                {detailsJSX}
            </div>
            <div className="dialogButtons">
                <button className="closeBtn" onClick={(e) => {
                    e.stopPropagation();
                    handleCloseDialog();
                }}>Close</button>
                {itemData.id && 
                    <div>
                        <button className="addToCartBtn" onClick={() => props.addToCart(itemData)}>Add to cart</button>
                        { props.cart.length > 0 && <a href="/cart"><button className="showCartBtn">Show cart ({props.cart.reduce((accumulator, currentVal) => accumulator + currentVal.quantity, 0)})</button></a>}
                    </div>
                }
            </div>
        </dialog>
    );
}