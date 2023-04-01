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
            <p className="itemTitle">{itemData.title}</p>
            <div className="imageWrap">
                <p className="itemImage"><img src={itemData.image} alt={itemData.title} /></p>
            </div>
            <p className="itemCategory">Category: {capitalize(itemData.category)}</p>
            <p className="itemDescription">
                <p className="descriptionLabel">Description:</p>
                <p className="descriptionText">{itemData.description}</p>
            </p>
            <p className="itemRating">
                Rating: <span className="ratingVal">{itemData.rating.rate}</span> (per <span className="ratingCount">{itemData.rating.count}</span> votes)
            </p>
            <p className="itemPrice">${itemData.price}</p>
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

    console.log(itemData);

    return (
        <dialog className="itemDetailsDialog" onClose={handleCloseDialog}>
            <div className="itemDetailsDiv">
                {detailsJSX}
            </div>
            <div className="dialogButtons">
                <button className="close" onClick={(e) => {
                    e.stopPropagation();
                    handleCloseDialog();
                }}>Close</button>
            </div>
        </dialog>
    );
}