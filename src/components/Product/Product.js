import React from "react";
import "./Product.css"

export default function Product(props)
{
    const product = props.product;

    return (
        <div className="product">
            <div className="imageDiv">
                <img alt="" className="productImage" src={product.image} />
            </div>
            <div className="detailsDiv">
                <p className="productName">{product.title}</p>
                <p className="productCategory">{product.category}</p>
            </div>
            <div className="priceDiv">
                <p className="productPrice">${product.price}</p>
                <p><button>Add to cart</button></p>
            </div>
        </div>
    );
}