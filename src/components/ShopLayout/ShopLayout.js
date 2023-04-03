import React from "react";
import CategoriesPanel from "../CategoriesPanel/CategoriesPanel";
import { Outlet } from "react-router-dom";
import "./ShopLayout.css"

export default function ShopLayout()
{
    const [displayOpts, setDisplayOpts] = React.useState({
        currentPage: 1,
        itemsPerPage: 10,
        sortBy: "Name ASC",
        category: "all",
        products: []
    });

    return (
        <div className="shopDiv">
            <CategoriesPanel currentCat={displayOpts.category} setOpts={setDisplayOpts} />
            <Outlet context={[displayOpts, setDisplayOpts]} />
        </div>
    );
}