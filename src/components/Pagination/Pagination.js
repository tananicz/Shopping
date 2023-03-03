import React from "react";
import "./Pagination.css"

export default function Pagination(props)
{
    const totalPages = props.totalPages;
    const currentPage = props.currentPage;
    const setPage = props.setPage;
    let pagesArr = [];

    for (let i = 1; i <= totalPages; i++)
        pagesArr.push(String(i));

    if (currentPage > 1)
        pagesArr.unshift("Prev");

    if (currentPage < totalPages)
        pagesArr.push("Next");

    let aKey = 0;
    const pages = pagesArr.map(elem => {
        let jsxElem;
        const currElem = elem;

        switch (elem)
        {
            case "...":
                jsxElem = (<>...</>);
                break;
            case "Prev":
                jsxElem = (<a onClick={() => { setPage(Number(currentPage) - 1) }}><button>{elem}</button></a>);
                break;
            case "Next":
                jsxElem = (<a onClick={() => { setPage(Number(currentPage) + 1) }}><button>{elem}</button></a>);
                break;
            default:
                jsxElem = (<a onClick={() => { setPage(Number(currElem)) }}><button>{elem}</button></a>);
                break;
        }

        aKey++;
        return (<span key={aKey} className={Number(elem) === currentPage ? "current" : ""}>{jsxElem}</span>);
    });

    return (
        <div className="pager">
            {pages}
        </div>
    );
}