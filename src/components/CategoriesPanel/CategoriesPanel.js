import React from "react";
import "./CategoriesPanel.css"

export default function CategoriesPanel(props)
{
    function capitalize(str)
    {
        return str[0].toUpperCase() + str.substring(1);
    }

    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then(res => res.json())
                .then(data => setCategories(["All products"].concat(...data)));
    }, []);

    const categoriesElements = categories.map(category => {
        const aCategory = category === "All products" ? "all" : category;
        return (
            <div key={aCategory} className={aCategory === props.currentCat ? "category current" : "category"} onClick={() => { props.setOpts(prevOpts => {
                    return {
                        ...prevOpts,
                        currentPage: 1,
                        category: aCategory
                    };
                }); }}>
                <span>{capitalize(category)}</span>
            </div>
        );
    });

    return (
        <div className="categoriesPanel">
            {categoriesElements}
        </div>
    );
}