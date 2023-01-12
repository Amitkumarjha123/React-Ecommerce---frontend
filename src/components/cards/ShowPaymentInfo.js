import React from "react";

const ShowPaymentInfo = ({order,style}) =>{
    return (
        <div className={style}>
            <p>
                <span><b>Order Id</b> : {order.paymentIntent.id}</span>{" | "}
                <span><b>Amount</b> : {(order.paymentIntent.amount/100).toLocaleString("en-US",{
                    style :"currency",
                    currency :"INR"
                })}</span>{" | "}
                <span><b>Currency</b> : {order.paymentIntent.currency.toUpperCase()}</span>{" | "}
                <span><b>Payment</b> : {order.paymentIntent.status.toUpperCase()}</span>{" | "}
                <span><b>Ordered on</b> : {new Date(order.paymentIntent.created*1000).toLocaleString()}</span>{"  "}
                <span className="badge bg-info text-white">STATUS : {order.orderStatus}</span>{" "}
            </p>
        </div>
    )
}

export default ShowPaymentInfo;