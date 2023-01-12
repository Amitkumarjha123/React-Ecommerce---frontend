import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyCart, saveUserAddress , applyCoupon} from "../functions/user";
import { getCoupons } from "../functions/coupon";
import {toast} from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createCODOrder } from "../functions/user";

const Checkout=({history}) =>{
    const [products,setProducts] = useState([]);
    const [total,setTotal] = useState(0);
    const [address,setAddress] = useState("");
    const [addressSaved,setAddressSaved] = useState(false);
    // const [coupon,setCoupon] = useState("");
    const [couponList,setCouponList] = useState("");
    const [selectCoupon,setSelectCoupon] = useState("");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
   

    const dispatch = useDispatch();
    const {user,COD,coupon} = useSelector((state) =>({...state}));
   


    useEffect (() =>{
        getUserCart(user.token)
        .then((res) =>{
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        });
        getCoupons().then((res) => setCouponList(res.data));
            // console.log(couponList);
    },[])

    const emptyUserCart =()=>{
        if (typeof (window) !== "undefined"){
            (localStorage.removeItem("cart")) ;
        }

        dispatch ({
            type : "ADD_TO_CART",
            payload:[]
        });

        dispatch ({
            type : "COUPON_APPLIED",
            payload:false
        });

        emptyCart(user.token)
        .then((res) => {
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0);
            setSelectCoupon("");
            toast.success("Cart is empty. Continue shopping");
        });
    }

    const saveAddressToDb = () =>{
        console.log(address);
        saveUserAddress(address,user.token)
        .then((res) =>{
            if (res.data.ok){
                setAddressSaved(true);
                toast.success("Address saved");
            }
        });
        
    }

    const applyDiscountCoupon = () => {
        applyCoupon(selectCoupon, user.token)
        .then((res) =>{
            setTotalAfterDiscount(res.data);
            
            //push to redux
            dispatch ({
                type: "COUPON_APPLIED",
                payload : true
            })
           
        })
    }


    const createCashOrder = () =>{
        createCODOrder(COD,user.token,coupon).then(res =>{
           

            if (res.data.ok) {

             
                    if (typeof (window) !== "undefined"){
                        (localStorage.removeItem("cart")) ;
                    }
            
                    dispatch ({
                        type : "ADD_TO_CART",
                        payload:[]
                    });
            
                    dispatch ({
                        type : "COUPON_APPLIED",
                        payload:false
                    });

                    dispatch ({
                        type : "COD",
                        payload:false
                    });

                    emptyCart(user.token);
            
                    setTimeout(() =>{
                        history.push("/user/history");
                    },1000);
             }
        });
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br /> <br />
                <ReactQuill theme="snow" value={address} onChange={setAddress}/>
                <button className="btn btn-primary mt-2" onClick={saveAddressToDb} >
                    Save
                </button>
                <hr />

                <h4>Got Coupon ? </h4>
                <br></br>
                {/* <input
                 onChange={(e) => setCoupon(e.target.value)}
                 type="text"
                 value={coupon}
                 className="form-control">
                </input>
                <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button> */}
                <div className="form-group">
              
                    <select name="coupon" className="form-control mb-2"
                     onChange={(e)=> {
                        setSelectCoupon(e.target.value);
                        }}>
            
                    <option value="none" selected disabled hidden>Select a Coupon</option>
                    {couponList.length>0 && couponList.map((c)=>
                     (<option key={c._id} value={c.name}>{c.name}{" ---> "}{`${c.discount}% off`}</option>) )}

                    </select>
             
                    <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
                </div>
            
            </div>

            

            <div className="col-md-6">
                <h4> Order Summary</h4>
                <hr/>
                <p><h6>Number of Products : {products.length}</h6></p>
                <hr />
                 {products.map((p,i)=> (
                    <div key={i}>
                        <p>{p.product.title}-({p.color}) (₹{p.price}) x {p.count} = {" "}
                        ₹{p.product.price * p.count}
                        </p>
                    </div>
                 ))}
                <hr />
                <p>Cart Total: ₹{total}</p>

                {totalAfterDiscount>0 && (
                    <p className="bg-info p-2">Discount Applied : Total Payable = ₹{totalAfterDiscount}</p>
                )}

                <div className="row">
                    <div className="col-md-6">
                    {COD ? (
                        <button disabled={!addressSaved || !products.length} 
                        className="btn btn-primary"
                        onClick ={createCashOrder}
                        >Place Order</button>
                    ) : (
                        <button disabled={!addressSaved || !products.length} 
                        className="btn btn-primary"
                        onClick ={() => history.push("/payment")}
                        >Place Order</button>
                    )}
                        
                    </div>
                
               
                
                    <div className="col-md-6">
                        <button 
                        disabled={!products.length}
                        onClick={emptyUserCart } 
                        className="btn btn-primary">
                        Empty Cart
                        </button>
                </div>  
                </div>
            </div>
        </div>
    )
}

export default Checkout;