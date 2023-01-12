import React,{useState} from "react";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({orders,handleStatusChange}) =>{
    
    const [styleValue,setStyleValue] = useState("");
    const [styleId,setStyleId] = useState("");

    const handleSelectChange = (id, val) => {
        handleStatusChange(id,val);
        setStyleValue(val);
        setStyleId(id);
    }

    const style =(value) =>{
        switch (value) {
            case "Not Processed" :
                return "btn btn-block bg-light";
            case "Processing" :
                return "btn btn-block bg-info";
            case "Dispatched" :
                return "btn btn-block bg-warning";
            case "Cancelled" :
                return "btn btn-block bg-danger";
            case "Completed" :
                return "btn btn-block bg-success";
            

                default :
                return "btn btn-block bg-light"
        }
    }

    const productsInEachOrder = (order) => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p,i) =>(
                    <tr key={i}>
                        <td><b>{p.product.title}</b></td>
                        <td>₹{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>{p.product.shipping==="Yes" ? <CheckCircleOutlined style={{color:"green"}} /> : <CloseCircleOutlined style={{color:"red"}}/> }</td>
                       
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
    <>
        {orders.map((order)=> (
        <div key={order._id} className="row pb-5">
                
                <div className={styleId===order._id && style(styleValue)  || "btn btn-block bg-light"}>
                
                <ShowPaymentInfo order={order} />

            <div className="row">
                <div className="col-md-2">Delivery Status </div>
                    <div className="col-md-2">

                        <select onChange={(e) => handleSelectChange(order._id, e.target.value)}
                        className="form-control mb-2"
                        defaultValue={order.orderStatus}
                        name="status"
                        >
                            <option value="none" selected disabled hidden>Select</option>
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Not Processed">Not Processed</option>
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Completed">Completed</option>

                        </select>
                    </div>
                </div>
            </div>

            {productsInEachOrder(order)}
        </div>
        ))}
    </>
    );
};

export default Orders;