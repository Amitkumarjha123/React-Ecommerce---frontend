import React,{useState} from "react";
import {Card,Tabs,Tooltip} from "antd";
import {Link} from "react-router-dom";
import {HeartOutlined,ShoppingCartOutlined} from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector,useDispatch } from "react-redux";
import { addToWishList } from "../../functions/user";
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";

const {TabPane} =Tabs;
//child component of Product.js page
const SingleProduct = ({product,onStarClick,star}) =>{

    const {title,images,description,_id} =  product;
    const [tooltip,setTooltip] = useState("Click to add");

    const dispatch = useDispatch();
    const {user,cart} = useSelector((state) =>({...state})); 
    let history = useHistory();

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

    const handleAddToWishList = (e) =>{
        e.preventDefault();
        addToWishList(product._id,user.token).then(res =>{
            console.log("ADDED TO WISHLIST",res.data);
            toast.success("Added to wishlist");
            // history.push("/user/wishlist");
        });
    }

    
    return (
        <>
        <div className="col-md-7"> 
            
            <Carousel showArrows={true} autoPlay infiniteLoop>
                {images && images.length ? (images.map((i) => <img style={{objectFit:"cover"}} 
                src={i.url} key={i.public_id} />)) :
                <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OHx8fGVufDB8fHx8&w=1000&q=80" />
                }
            </Carousel>

            <Tabs type="card">
                <TabPane tab="Description" key="1">
                    {description && description}
                </TabPane>
                <TabPane tab="More" key="2">
                    Call us n xxxx xxx xxx for more information about this product.
                </TabPane>
            </Tabs>
        </div>



        <div className="col-md-5"> 
            <h1 className="bg-info p-3 text-center">{title}</h1>
            { product && product.rating && product.rating.length>0 ? showAverage(product):<div className="text-center pt-1 pb-3">No ratings yet</div>}

            <Card
                actions ={[
                    <>
                        <Tooltip title={product.quantity===0 ? "": tooltip}>
                             <a disabled = {product.quantity===0} onClick={product.quantity===0 ? {}:handleAddToCart} >
                             <ShoppingCartOutlined  /> <br />{product.quantity===0 ? "Out of Stock" : "Add to Cart"}
                             </a>
                        </Tooltip>
                    </>,
                    <a onClick={handleAddToWishList}>
                    <HeartOutlined className="text-info"/><br></br>Add to Wishlist
                    </a>,
                    
                    <RatingModal>
                    <StarRating
                        name={_id}
                        numberOfStars={5}
                        rating={star}
                        changeRating={onStarClick}
                        isSelectable={true}
                        starRatedColor="red"
                    />
                    </RatingModal>
                ]}
            >
                
                <ProductListItems product={product}/>

            </Card>
         </div>

        </>
    )
}

export default SingleProduct;