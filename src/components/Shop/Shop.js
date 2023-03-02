import React from "react";
import Product from "../Product/Product";
import Pagination from "../Pagination/Pagination";
import "./Shop.css"

export default function Shop(props)
{
    const [currentPage, setPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    let totalPages = Math.ceil(props.products.length / itemsPerPage);

    let itemsElement = (<div></div>);

    if (props.products.length > 0)
    {
        const filteredProducts = props.products.slice((currentPage - 1) * itemsPerPage, itemsPerPage);
        const productsJSXArray = filteredProducts.map(product => { return (
            <Product key={product.id} product={product} />
        )});

        itemsElement = (
            <div className="mainPanel">
                <div className="sortingBar">
                    <select>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                </div>
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