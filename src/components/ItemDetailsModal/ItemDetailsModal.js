import React from "react";
import "./ItemDetailsModal.css"

export default function ItemDetailsModal(props)
{
    const [itemData, setItemData] = React.useState({});
    const itemDetailsAPIUrl = "https://fakestoreapi.com/products/" + props.productId;

    let detailsJSX = <div className="loading"><img src="loading.gif" /></div>;
    if (itemData.id)
    {
        detailsJSX = <>
            <p className="itemTitle">{itemData.title}</p>
            <div className="imageWrap">
                <p className="itemImage"><img src={itemData.image} alt={itemData.title} /></p>
            </div>
            <p className="itemCategory">{itemData.category}</p>
            <p className="itemDescription">{itemData.description}</p>
            <p className="itemRating">
                <span className="ratingVal">Rate: {itemData.rating.rate}</span>
                <span className="ratingCount">Count: {itemData.rating.count}</span>
            </p>
            <p className="itemPrice">${itemData.price}</p>
        </>;
    }

    function handleCloseDialogClick()
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

        async function fetchData()
        {
            const resp = await fetch(itemDetailsAPIUrl);
            const data = await resp.json();
            setItemData(data);
        }

        fetchData();
    }, []);

    console.log(itemData);

    return (
        <dialog className="itemDetailsDialog">
            <div className="itemDetailsDiv">
                {detailsJSX}
            </div>
            <div className="dialogButtons">
                <button>Add to cart</button>
                <button onClick={handleCloseDialogClick}>Close</button>
            </div>
        </dialog>
    );
}