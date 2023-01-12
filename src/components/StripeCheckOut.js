import React, {useState,useEffect} from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {Card} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import { createOrder,emptyCart } from "../functions/user";

const StripeCheckOut = ({history}) =>{
    const dispatch = useDispatch();
    const {user,coupon} =  useSelector((state) => ({...state}));

    const [succeeded,setSucceeded] =  useState(false);
    const [error,setError] =  useState(null);
    const [processing,setProcessing] =  useState("");
    const [disabled,setDisabled]=  useState(true);
    const [clientSecret,setClientSecret] =  useState("");

    const [cartTotal,setCartTotal] = useState(0);
    const [totalAfterDiscount,setTotalAfterDiscount] = useState(0);
    const [payable,setPayable] =  useState(0);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() =>{
        createPaymentIntent(user.token,coupon)
        .then((res) => {
            
            console.log("create payment intent",res.data);
            setClientSecret(res.data.clientSecret);
            console.log("state client secret",clientSecret);

            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            setPayable(res.data.payable);
           
        });
    },[]);

    const handleSubmit = async (e) =>{
        console.log(e);
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method :{
                card : elements.getElement(CardElement),
                billing_details :{
                name:e.target.name.value
                }
            }
        });
        
        if (payload.error) {
            setError(`Payment failed : ${payload.error.message}`);
            console.log("Payload error", payload.error.message)
            setProcessing(false);
            toast.error("Payment failed");
        } else {

            createOrder(payload,user.token)
            .then(res => {
                if (res.data.ok){

                    if (typeof (window) !== "undefined") localStorage.removeItem("cart") ;
                    
                    dispatch ({
                        type : "ADD_TO_CART",
                        payload:[]
                    });

                    dispatch ({
                        type : "COUPON_APPLIED",
                        payload:false
                    });
            
                    emptyCart(user.token);
                    
                }
            });

            console.log("Payload",payload);
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            toast.success("Payment Successful !! View User History")
        }
    }

    const handleChange = async (e) =>{
        setDisabled(e.empty);
        setError(e.error ? e.error.message :"");

    }

    const cardStyle = {
       
            style: {
            base: {
             color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
            color: "#32325d",
            },
            },
            invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
            },
            },
                   
    }


    return (

        <>
            {
                !succeeded && <div>
                    {coupon && totalAfterDiscount !==undefined ? (
                        <p className="alert alert-success"><h5>{`Total after discount : ₹${totalAfterDiscount}`}</h5></p>
                    ) : (
                        <p className="alert alert-danger">No coupon applied</p>
                    )}
                </div>
            }
            <div className="text-center pb-5">
                <Card
                    cover = {
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/order-placed-purchased-icon.svg"
                        style ={{
                            height : "100px",
                            OObjectFit:"cover",
                            marginBottom:"-50px"
                        }} 

                        />
                    }
                     
                    actions = {[
                        <>
                        <i  class="fa fa-inr"></i><p className="text-info"><h5>Total : ₹{cartTotal} </h5></p>
                        
                        </>,
                        
                        <>
                            <CheckOutlined className="text-info" /> <br></br>
                            <h5>Total Payable : ₹{(payable/100).toFixed(2)}</h5>
                        </>
                    ]}
                />
            </div>

            <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>

                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />

                <button className="stripe-button" 
                disabled={processing || disabled || succeeded}>
                <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : "Pay"} </span>
                </button>
                <br></br>

                {error && <div className="card-error bg-alert p-2" role="alert">{error}</div>}
                <p className={succeeded ? "result-message bg-info p-2" : "result-message hidden"}>Payment Successful.<Link to="/user/history">{" "}Click here to view your purchase history</Link></p>
            </form>

            
        </>
    );
}

export default StripeCheckOut;