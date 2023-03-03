import React from "react";
import Product from "../Product/Product";
import OptionsBar from "../OptionsBar/OptionsBar";
import CategoriesPanel from "../CategoriesPanel/CategoriesPanel";
import Pagination from "../Pagination/Pagination";
import "./Shop.css"

export default function Shop()
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
    const [sortBy, setSortBy] = React.useState("Name ASC");
    const [category, setCategory] = React.useState("all");
    const apiUrl = category === "all" ? "https://fakestoreapi.com/products" : ("https://fakestoreapi.com/products/category/" + category);
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
                .then(data => setProducts(data));
    }, [category, apiUrl]);
    
    let totalPages = Math.ceil(products.length / itemsPerPage);
    let itemsElement = (<div></div>);

    if (products.length > 0)
    {
        const itemsArray = [].concat(...products).sort((a, b) => { return sortFunction(sortBy, a, b); });
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
                {totalPages > 1 && <div className="paginationContainer"><Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} /></div> }
            </div>
        );
    }

    return (
        <div className="shopDiv">
            <CategoriesPanel setCategory={setCategory} setPage={setPage} />
            {itemsElement}
        </div>
    )
}