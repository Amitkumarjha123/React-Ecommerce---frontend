import React from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import StripeCheckOut from "../components/StripeCheckOut";


import "../stripe.css";


const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment =() =>{
    return (
        
        <div className="container-fluid p-5 text-center">
            <h3>Complete your purchase</h3>
            <Elements stripe = {promise} >
                <div className="col-md-8 offset-md-2 text-center">
                  <StripeCheckOut />
                </div>
            </Elements>
        </div>
    
    );
}

export default Payment;