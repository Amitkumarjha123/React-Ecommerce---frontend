import React from "react";
import { Link } from "react-router-dom";

const ProductListItems =({product})=>{
    const {price,category,subs,shipping,color,brand,quantity,sold}=product;
   

    return (
        <ul className="list-group">
            <li className="list-group-item d-flex">
                Price
                <span className="ms-auto">
                    Rs. {price}
                </span>
            </li>

            {category && (<li className="list-group-item d-flex">
                Category{" "}
                <Link to={`/category/${category.slug}`} className="ms-auto">
                    {category.name}
                </Link>
            </li>)}

            {subs && (<li className="list-group-item d-flex">
                Sub Categories
                {subs.map((s)=> (
                <Link to ={`/sub/${s.slug}`} className="ms-auto" key={s._id}>
                     {s.name}
                </Link>
                ))}
            </li>)}

            <li className="list-group-item d-flex">
                Shipping
                <span className="ms-auto">
                    {shipping}
                </span>
            </li>

            <li className="list-group-item d-flex">
                Color
                <span className="ms-auto">
                    {color}
                </span>
            </li>

            <li className="list-group-item d-flex">
                Brand
                <span className="ms-auto">
                    {brand}
                </span>
            </li>

            <li className="list-group-item d-flex">
                Available
                <span className="ms-auto">
                    {quantity}
                </span>
            </li>

            <li className="list-group-item d-flex">
                Sold
                <span className="ms-auto">
                    {sold}
                </span>
            </li>
            
        </ul>
    )
}

export default ProductListItems;