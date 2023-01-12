import React, { useState,useEffect } from "react";
// import { getCategory } from "../../functions/category";
import { getSingleCategory } from "../../functions/category";
import Link from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";
import {LoadingOutlined} from "@ant-design/icons";

const CategoryHome =({match})=>{
    const [category,setCategory] = useState({});
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    const {slug}=match.params;
    console.log(products);
    
    useEffect(()=>{
        setLoading(true);
        getSingleCategory(slug)
        .then((res) => {
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
            console.log(loading);
        });
        
        // console.log(loading);
    },[]);


 return (
    <div className="container">
        <div className="row">
            <div className="col">
                {loading ? (<LoadingOutlined className="text-center h4 bg-info p-3 mt-5 mb-5 display-4" />):
                (<h4 className="text-center h4 bg-info p-3 mt-5 mb-5 display-4">
                    {products.length} Products in "{category.name}" category"
                </h4>)}
            </div>

        </div>

        <div className="row">
        {products && products.map((p)=>(
            <div className="col" key={p._id}>
                <ProductCard product={p} />
            </div>
        ))}

        </div>
    </div>
 );
}

export default CategoryHome;