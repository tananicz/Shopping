import React from "react";
import Product from "../Product/Product";
import OptionsBar from "../OptionsBar/OptionsBar";
import Pagination from "../Pagination/Pagination";
import "./Shop.css"

export default function Shop(props)
{
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

    const [currentPage, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    let totalPages = Math.ceil(props.products.length / itemsPerPage);
    const [sortBy, setSortBy] = React.useState("Name ASC");

    let itemsElement = (<div></div>);

    if (props.products.length > 0)
    {
        const itemsArray = [].concat(...props.products).sort((a, b) => { return sortFunction(sortBy, a, b); });
        const filteredProducts = itemsArray.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        const productsJSXArray = filteredProducts.map(product => { return (
            <Product key={product.id} product={product} />
        )});

        itemsElement = (
            <div className="mainPanel">
                <OptionsBar currentItemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} setPage={setPage} currentSortBy={sortBy} setSortBy={setSortBy} />
                <div className="itemsList">
                    {productsJSXArray}
                </div>
                {totalPages > 1 && <div className="paginationContainer"><Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} /></div>}
            </div>
        );
    }

    return (
        <div className="shopDiv">
            <div className="leftPanel" style={{width: "15%", backgroundColor: "#ddd"}}>Categories panel...</div>
            {itemsElement}
        </div>
    )
}