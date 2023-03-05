import React from "react";
import "./OptionsBar.css"

export default function OptionsBar(props)
{
    const itemsPerPageArr = [5, 10, 20];
    const itemsPerPageOpts = itemsPerPageArr.map(elem => {
        return (
            <option key={elem}>{elem}</option>
        );
    });

    return (
        <div className="optionsBar">
            <div>
                <span className="optionsLabel">Sort by: </span>
                <select value={props.currentSortBy} onChange={(e) => { props.setOpts(prevOpts => {
                        return {
                            ...prevOpts,
                            currentPage: 1,
                            sortBy: e.target.value
                        };
                    }); }}>
                    <option>Name ASC</option>
                    <option>Name DESC</option>
                    <option>Price ASC</option>
                    <option>Price DESC</option>
                </select>
            </div>
            <div>
                <span className="optionsLabel">Items per page: </span>
                <select value={props.currentItemsPerPage} onChange={(e) => { props.setOpts(prevOpts => {
                        return {
                            ...prevOpts,
                            currentPage: 1,
                            itemsPerPage: Number(e.target.value)
                        };
                    }); }}>
                    {itemsPerPageOpts}
                </select>
            </div>
        </div>
    );
}