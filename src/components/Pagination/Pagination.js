import React from "react";

export default function Pagination(props)
{
    const totalPages = props.totalPages;
    let pagesArr;

    if (totalPages > 3)
        pagesArr = ["1", "2", "...", String(totalPages)];
    else
    {
        pagesArr = [];
        for (let i = 1; i <= totalPages; i++)
            pagesArr.push(String(i));
    }
    pagesArr.unshift("Prev");
    pagesArr.push("Next");

    console.log(pagesArr);

    return (
        <div className="pager">
            some pager...
        </div>
    );
}