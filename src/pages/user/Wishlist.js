import React,{useState,useEffect} from "react";
import UserNav from "../../components/nav/UserNav";
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom';
import { getWishList,removeWishList } from "../../functions/user";
import {DeleteOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";

const Wishlist = () =>{
    const [wishlist,setWishlist] = useState([]);
    const {user} = useSelector((state) => ({...state}));

    useEffect(() =>{
        getWishList(user.token).then((res) =>{
            setWishlist(res.data[0].wishlist);
            console.log("RES",res.data[0].wishlist,"Wishlist",wishlist);
        });
    },[]);

    const handleRemove = (productId) =>{
        removeWishList(productId,user.token).then((res) =>{
            toast.success("Deleted")
            getWishList(user.token).then((res) => setWishlist(res.data[0].wishlist));
            
        });
    }

return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNav />
            </div>

            <div className="col">
            <h4>Wishlist</h4> 

            {wishlist && wishlist.map((p) =>(
                <div key={p._id} className="alert alert-secondary">
                    <Link to={`/product/${p.slug}`}>{p.title}</Link>
                    <span onClick={() => handleRemove(p._id)} className="d-flex">
                        <DeleteOutlined style={{cursor:"pointer"}} className="text-danger ms-auto" />
                    </span>
                </div>
            ))}
            </div> 
        </div>
    </div>
);
}

export default Wishlist;