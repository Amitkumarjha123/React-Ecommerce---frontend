import React, { useState,useEffect } from "react";
// import { getCategory } from "../../functions/category";
import { getSub } from "../../functions/sub";
import Link from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";
import {LoadingOutlined} from "@ant-design/icons";

const SubHome =({match})=>{
    const [sub,setSub] = useState({});
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    const {slug}=match.params;
    console.log("Products",products);
    useEffect(()=>{
        setLoading(false);
        getSub(slug)
        .then((res) => {
            console.log(res);
            setSub(res.data.sub);
            setProducts(res.data.products);
            setLoading(false);
            
        })
        
    },[]);


 return (
    <div className="container">
        <div className="row">
            <div className="col">
                {loading ? (<LoadingOutlined className="text-center h4 bg-info p-3 mt-5 mb-5 display-4" />):
                (<h4 className="text-center h4 bg-info p-3 mt-5 mb-5 display-4">
                    {products.length} Products in "{sub.name}" sub category"
                </h4>)}
            </div>

        </div>

        <div className="row">
        {(products).map((p)=>(
            <div className="col" key={p._id}>
                <ProductCard product={p} />
            </div>
        ))}

        </div>
    </div>
 );
}

export default SubHome;