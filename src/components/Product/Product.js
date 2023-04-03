import React from "react";
import "./Product.css"

export default function Product(props)
{
    const product = props.product;
    const addToCart = props.addToCart;

    function handleProductClick(productId)
    {
        props.setOpts(prevOpts => {
            return {
                ...prevOpts,
                selectedProduct: productId
            };
        });
    }

    return (
        <div className="product">
            <div className="imageDiv">
                <img alt="" className="productImage" src={product.image} />
            </div>
            <div className="detailsDiv">
                <p className="productName" onClick={() => handleProductClick(product.id)}>{product.title}</p>
                <p className="productCategory">{product.category}</p>
            </div>
            <div className="priceDiv">
                <p className="productPrice">${product.price}</p>
                <p><button onClick={() => { addToCart(product); }}>Add to cart</button></p>
            </div>
        </div>
    );
}