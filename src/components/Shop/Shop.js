import React from "react";
import Product from "../Product/Product";
import OptionsBar from "../OptionsBar/OptionsBar";
import Pagination from "../Pagination/Pagination";
import { useOutletContext } from "react-router-dom";
import "./Shop.css"

export default function Shop(props)
{
    const [displayOpts, setDisplayOpts] = useOutletContext();

    function sortFunction(method, item1, item2)
    {
        switch (method) 
        {
            case "Name DESC":
                return -1 * item1.title.localeCompare(item2.title);
            case "Price ASC":
                return Number(item1.price) < Number(item2.price) ? -1 : Number(item1.price) === Number(item2.price) ? 0 : 1; 
            case "Price DESC":
                return Number(item2.price) < Number(item1.price) ? -1 : Number(item1.price) === Number(item2.price) ? 0 : 1; 
            default:
                return item1.title.localeCompare(item2.title);
        }
    }

    const totalPages = Math.ceil(displayOpts.products.length / displayOpts.itemsPerPage);
    const apiUrl = displayOpts.category === "all" ? "https://fakestoreapi.com/products" : ("https://fakestoreapi.com/products/category/" + displayOpts.category);

    React.useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
                .then(data => setDisplayOpts(prevOpts => {
                        return {
                            ...prevOpts,
                            products: data
                        };
                    }));
    }, [displayOpts.category, apiUrl]);

    let itemsElement = (<div></div>);

    if (displayOpts.products.length > 0)
    {
        const itemsArray = JSON.parse(JSON.stringify(displayOpts.products)).sort((a, b) => { return sortFunction(displayOpts.sortBy, a, b); });
        const filteredProducts = itemsArray.slice((displayOpts.currentPage - 1) * displayOpts.itemsPerPage, displayOpts.currentPage * displayOpts.itemsPerPage);
        const productsJSXArray = filteredProducts.map(product => { return (
            <Product key={product.id} product={product} addToCart={props.addToCart} />
        )});

        itemsElement = (
            <div className="mainPanel">
                <OptionsBar currentItemsPerPage={displayOpts.itemsPerPage} currentSortBy={displayOpts.sortBy} setOpts={setDisplayOpts} />
                <div className="itemsList">
                    {productsJSXArray}
                </div>
                {totalPages > 1 && 
                    <div className="paginationContainer"><Pagination currentPage={displayOpts.currentPage} totalPages={totalPages} setOpts={setDisplayOpts} /></div> }
            </div>
        );
    }

    return (
        <>{itemsElement}</>
    )
}