import React, {useEffect,useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import {LoadingOutlined} from "@ant-design/icons";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";



const AllProducts = () => {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    const {user} = useSelector((state) => ({...state}));

    useEffect (()=> {
        loadAllProducts();
    },[]);

    const loadAllProducts = ()=>{
        setLoading(true);
        getProductsByCount(100)
        .then((res) => {
        setProducts(res.data);
        setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        })
    }

    const handleRemove =(slug) =>{
        let answer = window.confirm("Delete ?");
        if (answer) {
            removeProduct(slug, user.token)
            .then((res) =>{
                loadAllProducts();
                toast.success(`${res.data.title} is deleted`);
            })
            .catch((err) =>{
                if (err.response.status===400) toast.error(err.response.data);
                console.log(err);
                setLoading(false);
            })
        }
    }

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
    
            <div className="col">
            <div className="row">
            {loading? (<h4><LoadingOutlined className="text-danger h1" /></h4>) : (<h4>All Products</h4>)}
        
             {products.map((product) =>(
                <div key={product._id} className="col-md-4 pb-3">
                <AdminProductCard product={product} handleRemove={handleRemove} slug={product.slug}/>
                </div>
             ))}
            </div>
         </div>
        </div>
    </div>
    );
    }

export default AllProducts;