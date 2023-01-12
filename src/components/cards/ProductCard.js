import React,{useState} from "react";
import {Card,Tooltip} from "antd";
import {EyeOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector,useDispatch } from "react-redux";




const {Meta} = Card;
const ProductCard = ({product})=>{
    const {title, description,images,slug,price}= product;
    const [tooltip,setTooltip] = useState("Click to add");

    const dispatch = useDispatch();
    const {user,cart} = useSelector((state) =>({...state})); 

    const handleAddToCart=()=>{
        let cart=[];
        if (typeof (window) !== "undefined"){

            if (localStorage.getItem("cart")) {
                cart=JSON.parse(localStorage.getItem("cart"));
            }
            
                cart.push({...product,count:1});
                let unique = _.uniqWith(cart,_.isEqual);
                localStorage.setItem("cart",JSON.stringify(unique));
                setTooltip("Added");
                
                dispatch({
                    type:"ADD_TO_CART",
                    payload:unique
                });

                dispatch({
                    type:"SET_VISIBLE",
                    payload:true
                });
        }
    }

    return (
        <>
    { product && product.rating && product.rating.length>0 ? showAverage(product):
    <div className="text-center pt-1 pb-3">No ratings yet</div>}

    <Card
        cover={
            <img src={images && images.length ? images[0].url :"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OHx8fGVufDB8fHx8&w=1000&q=80"} 
            style={{height:"200px", objectFit:"cover"}} className="p-1"></img>
        }
        actions ={[
        <Link to ={`/product/${slug}`}>
        <EyeOutlined /> <br />View Product
        </Link>, 
        <>
        <Tooltip title={product.quantity===0 ? "": tooltip}>
            <a disabled = {product.quantity===0} onClick={product.quantity===0 ? {}:handleAddToCart} >
            
            <ShoppingCartOutlined  /> <br />{product.quantity===0 ? "Out of Stock" : "Add to Cart"}
            </a>
        </Tooltip>
        </>
        ]}
    >
    <Meta title={`${title} - ₹${price}`} description={description} />
    </Card>
    </>
    );
}

export default ProductCard;